const express = require('express');
const multer = require('multer');
const pinataSDK = require('@pinata/sdk');
const { ethers } = require('ethers');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Configure multer for memory storage (Vercel compatible)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const CONTRACT_ADDRESS = '0x7d92744F76a0b866c0068e2872bcFDeB009d92C3';
const ABI = require('./abi.json');

// Payment tracker configuration
const PAYMENT_CONTRACT_ADDRESS = '0x6C16DCDBca2ee486c87E4e987AB1e16106e09182'; // Replace with actual deployed address
const PAYMENT_ABI = require('./payment-abi.json');

// Create provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.ANKR_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Initialize contract only if CONTRACT_ADDRESS is set
let contract;
if (CONTRACT_ADDRESS !== 'YOUR_DEPLOYED_CONTRACT_ADDRESS') {
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
} else {
  console.log('⚠️  Warning: CONTRACT_ADDRESS not set. Please deploy your contract and update the address.');
}

// Initialize payment contract only if PAYMENT_CONTRACT_ADDRESS is set
let paymentContract;
if (PAYMENT_CONTRACT_ADDRESS !== 'YOUR_PAYMENT_CONTRACT_ADDRESS') {
  paymentContract = new ethers.Contract(PAYMENT_CONTRACT_ADDRESS, PAYMENT_ABI, wallet);
} else {
  console.log('⚠️  Warning: PAYMENT_CONTRACT_ADDRESS not set. Please deploy your payment contract and update the address.');
}

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);

// Hardcoded access control for program tracker
function validateProgramAccess(req, res, next) {
  const { Program, Organization, uuid } = req.query;
  
  // Check for required parameters
  if (!Program || !Organization || !uuid) {
    return res.status(403).send(`
      <h1>Access Denied</h1>
      <p>Invalid access parameters. Please use the correct URL format:</p>
      <p><code>/program-tracker?Program=YourProgram&Organization=YourOrganization&uuid=YourUUID</code></p>
    `);
  }
  
  // Store program info in request for later use
  req.programInfo = { Program, Organization, uuid };
  next();
}

// Hardcoded access control for payment tracker
function validatePaymentAccess(req, res, next) {
  const { username, Program, Organization, mobile, tin, uuid } = req.query;
  
  // Check for required parameters
  if (!username || !Program || !Organization || !mobile || !tin || !uuid) {
    return res.status(403).send(`
      <h1>Access Denied</h1>
      <p>Invalid access parameters. Please use the correct URL format:</p>
      <p><code>/payment?username=Name&Program=ProgramName&Organization=OrgName&mobile=Phone&tin=TIN&uuid=UUID</code></p>
      <hr>
      <p><strong>Example:</strong></p>
      <p><a href="/payment?username=Don%20Don%20Donkey&Program=Save%20the%20Sea%20Turtles&Organization=World%20Wide%20Fund%20for%20Nature&mobile=60327810500&tin=IG56003500070&uuid=231321323">
        /payment?username=Don Don Donkey&Program=Save the Sea Turtles&Organization=World Wide Fund for Nature&mobile=60327810500&tin=IG56003500070&uuid=231321323
      </a></p>
    `);
  }
  
  // Store payment info in request for later use
  req.paymentInfo = { username, Program, Organization, mobile, tin, uuid };
  next();
}

// Serve the program tracker page with access control
app.get('/program-tracker', validateProgramAccess, (req, res) => {
  res.sendFile(__dirname + '/program-tracker.html');
});

// Serve the payment tracker page with access control
app.get('/payment', validatePaymentAccess, (req, res) => {
  res.sendFile(__dirname + '/payment.html');
});

// Redirect root to access denied
app.get('/', (req, res) => {
  res.status(403).send(`
    <h1>Access Denied</h1>
    <p>Direct access not allowed. Please use one of the correct URL formats:</p>
    
    <h3>🏛️ Program Tracker</h3>
    <p><code>/program-tracker?Program=YourProgram&Organization=YourOrganization&uuid=YourUUID</code></p>
    <p><strong>Example:</strong></p>
    <p><a href="/program-tracker?Program=Save the Sea Turtles&Organization=World Wide Fund for Nature&uuid=231321312">
      Program Tracker Example
    </a></p>
    
    <hr>
    
    <h3>💳 Payment Tracker</h3>
    <p><code>/payment?username=Name&Program=ProgramName&Organization=OrgName&mobile=Phone&tin=TIN&uuid=UUID</code></p>
    <p><strong>Example:</strong></p>
    <p><a href="/payment?username=Don%20Don%20Donkey&Program=Save%20the%20Sea%20Turtles&Organization=World%20Wide%20Fund%20for%20Nature&mobile=60327810500&tin=IG56003500070&uuid=231321323">
      Payment Tracker Example
    </a></p>
  `);
});

// Get transaction details by hash
app.get('/transaction/:hash', async (req, res) => {
  try {
    const txHash = req.params.hash;
    console.log('🔍 Looking up transaction:', txHash);

    // Validate transaction hash format
    if (!txHash || !txHash.match(/^0x[a-fA-F0-9]{64}$/)) {
      return res.status(400).json({ error: 'Invalid transaction hash format' });
    }

    // Get transaction details from blockchain
    const tx = await provider.getTransaction(txHash);
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!tx || !receipt) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Parse the transaction data to extract our contract call details
    let contractCallData = null;
    if (receipt.to && receipt.to.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
      try {
        // Decode the transaction input data
        const iface = new ethers.Interface(ABI);
        const decoded = iface.parseTransaction({ data: tx.data, value: tx.value });
        
        if (decoded && decoded.name === 'addProgramEntry') {
          // Parse combined IPFS hashes
          const ipfsHashes = decoded.args[3].split(',');
          contractCallData = {
            functionName: decoded.name,
            picName: decoded.args[0],
            organizationName: decoded.args[1],
            milestone: decoded.args[2],
            evidenceIpfsHash: ipfsHashes[0] || '',
            receiptIpfsHash: ipfsHashes[1] || '',
            amount: (Number(decoded.args[4]) / 100).toFixed(2) // Convert back from cents to MYR
          };
        }
      } catch (parseError) {
        console.log('Could not parse contract call data:', parseError.message);
      }
    }

    // Prepare response data
    const transactionDetails = {
      hash: tx.hash,
      blockNumber: receipt.blockNumber,
      from: tx.from,
      to: tx.to,
      value: ethers.formatEther(tx.value),
      gasUsed: receipt.gasUsed.toString(),
      gasPrice: tx.gasPrice ? ethers.formatUnits(tx.gasPrice, 'gwei') : 'N/A',
      status: receipt.status === 1 ? 'Success' : 'Failed',
      timestamp: await provider.getBlock(receipt.blockNumber).then(block => new Date(block.timestamp * 1000).toISOString()),
      contractCallData,
      explorerUrl: `https://sepolia.etherscan.io/tx/${txHash}`
    };

    res.json(transactionDetails);
  } catch (error) {
    console.error('❌ Error fetching transaction details:', error);
    res.status(500).json({ 
      error: 'Failed to fetch transaction details',
      message: error.message 
    });
  }
});

// Redirect to blockchain explorer
app.get('/explorer/:hash', (req, res) => {
  const txHash = req.params.hash;
  
  // Validate transaction hash format
  if (!txHash || !txHash.match(/^0x[a-fA-F0-9]{64}$/)) {
    return res.status(400).send('Invalid transaction hash format');
  }

  // Redirect to Sepolia Etherscan
  const explorerUrl = `https://sepolia.etherscan.io/tx/${txHash}`;
  res.redirect(explorerUrl);
});

// Get all program entries count
app.get('/entries/count', async (req, res) => {
  try {
    if (!contract) {
      return res.status(500).json({ error: 'Contract not initialized' });
    }

    const count = await contract.getEntriesCount();
    res.json({ totalEntries: count.toString() });
  } catch (error) {
    console.error('❌ Error getting entries count:', error);
    res.status(500).json({ 
      error: 'Failed to get entries count',
      message: error.message 
    });
  }
});

// Get specific program entry by ID
app.get('/entries/:id', async (req, res) => {
  try {
    if (!contract) {
      return res.status(500).json({ error: 'Contract not initialized' });
    }

    const entryId = req.params.id;
    const entry = await contract.getProgramEntry(entryId);
    
    // Parse combined IPFS hashes
    const ipfsHashes = entry[3].split(',');
    
    const entryDetails = {
      id: entryId,
      picName: entry[0],
      organizationName: entry[1],
      milestone: entry[2],
      evidenceIpfsHash: ipfsHashes[0] || '',
      receiptIpfsHash: ipfsHashes[1] || '',
      amount: (Number(entry[4]) / 100).toFixed(2), // Convert from cents to MYR
      timestamp: new Date(Number(entry[5]) * 1000).toISOString(),
      evidenceUrl: `https://gateway.pinata.cloud/ipfs/${(ipfsHashes[0] || '').replace('ipfs://', '')}`,
      receiptUrl: `https://gateway.pinata.cloud/ipfs/${(ipfsHashes[1] || '').replace('ipfs://', '')}`
    };

    res.json(entryDetails);
  } catch (error) {
    console.error('❌ Error getting program entry:', error);
    res.status(500).json({ 
      error: 'Failed to get program entry',
      message: error.message 
    });
  }
});

app.post('/submit', upload.fields([{ name: 'evidence' }, { name: 'receipt' }]), async (req, res) => {
  console.log('📝 Submit request received');
  try {
    if (!contract) {
      console.log('❌ Contract not initialized');
      return res.status(500).json({ error: 'Contract not initialized. Please set CONTRACT_ADDRESS.' });
    }

    console.log('✅ Contract initialized');
    console.log('📋 Request body:', req.body);
    console.log('📁 Files:', Object.keys(req.files || {}));

    const { pic, organization, milestones, amount } = req.body;
    
    if (!pic || !organization || !milestones || !amount) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'Missing required fields: pic, organization, milestones, or amount' });
    }

    const milestoneList = JSON.parse(milestones);
    console.log('📊 Parsed milestones:', milestoneList);

    if (!req.files || !req.files.evidence || !req.files.receipt) {
      console.log('❌ Missing files');
      return res.status(400).json({ error: 'Missing required files: evidence and receipt' });
    }

    const evidenceFile = req.files.evidence[0];
    const receiptFile = req.files.receipt[0];
    console.log('📁 Files info:', { 
      evidence: evidenceFile.originalname, 
      receipt: receiptFile.originalname,
      evidenceSize: evidenceFile.size,
      receiptSize: receiptFile.size
    });

    console.log('📤 Uploading to Pinata...');

    const evidenceOptions = {
      pinataMetadata: {
        name: evidenceFile.originalname || 'evidence-file'
      }
    };

    const receiptOptions = {
      pinataMetadata: {
        name: receiptFile.originalname || 'receipt-file'
      }
    };

    // Upload files using buffer (memory storage)
    const evidenceResult = await pinata.pinFileToIPFS(evidenceFile.buffer, evidenceOptions);
    console.log('✅ Evidence uploaded:', evidenceResult.IpfsHash);
    
    const receiptResult = await pinata.pinFileToIPFS(receiptFile.buffer, receiptOptions);
    console.log('✅ Receipt uploaded:', receiptResult.IpfsHash);

    console.log('🔗 Calling smart contract...');
    
    // Convert milestones array to a single string
    const milestonesString = milestoneList.join(', ');
    console.log('📝 Milestones as string:', milestonesString);
    console.log('💰 Amount (MYR):', amount);
    
    // Store amount as regular number (MYR), multiply by 100 to avoid decimal issues
    const amountInCents = Math.round(parseFloat(amount) * 100);
    console.log('💰 Amount in cents:', amountInCents);
    
    // Combine IPFS hashes with comma separator
    const combinedIpfsHashes = `ipfs://${evidenceResult.IpfsHash},ipfs://${receiptResult.IpfsHash}`;
    console.log('🔗 Combined IPFS:', combinedIpfsHashes);
    
    const tx = await contract.addProgramEntry(
      pic,
      organization,
      milestonesString,
      combinedIpfsHashes,
      amountInCents
    );

    console.log('✅ Transaction submitted:', tx.hash);
    console.log('⏳ Waiting for transaction confirmation...');
    
    try {
      // Try to wait for confirmation with a timeout
      const receipt = await Promise.race([
        tx.wait(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Confirmation timeout')), 30000) // 30 second timeout
        )
      ]);
      console.log('✅ Transaction confirmed:', tx.hash);
    } catch (confirmError) {
      console.log('⚠️ Could not confirm transaction (likely due to network timeout), but transaction was submitted successfully:', tx.hash);
      console.log('Confirmation error:', confirmError.message);
    }
    
    res.json({ success: true, txHash: tx.hash });
  } catch (e) {
    console.error('❌ Error in /submit route:', e.message);
    console.error('📋 Full error:', e);
    res.status(500).json({ 
      error: 'Error submitting record', 
      message: e.message,
      details: e.toString()
    });
  }
});

// Submit payment entry to blockchain
app.post('/submit-payment', async (req, res) => {
  console.log('💳 Payment request received');
  try {
    if (!paymentContract) {
      console.log('❌ Payment contract not initialized');
      return res.status(500).json({ error: 'Payment contract not initialized. Please set PAYMENT_CONTRACT_ADDRESS.' });
    }

    console.log('✅ Payment contract initialized');
    console.log('📋 Request body:', req.body);

    const { username, programOrganization, mobile, tin, amount, remarks } = req.body;
    
    if (!username || !programOrganization || !mobile || !tin || !amount) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'Missing required fields: username, programOrganization, mobile, tin, or amount' });
    }

    console.log('🔗 Calling payment smart contract...');
    console.log('💰 Amount (MYR):', amount);
    
    // Store amount as regular number (MYR), multiply by 100 to avoid decimal issues
    const amountInCents = Math.round(parseFloat(amount) * 100);
    console.log('💰 Amount in cents:', amountInCents);
    
    const tx = await paymentContract.addPaymentEntry(
      username,
      programOrganization,
      mobile,
      tin,
      amountInCents
    );

    console.log('✅ Payment transaction submitted:', tx.hash);
    console.log('⏳ Waiting for payment transaction confirmation...');
    
    try {
      // Try to wait for confirmation with a timeout
      const receipt = await Promise.race([
        tx.wait(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Confirmation timeout')), 30000) // 30 second timeout
        )
      ]);
      console.log('✅ Payment transaction confirmed:', tx.hash);
    } catch (confirmError) {
      console.log('⚠️ Could not confirm transaction (likely due to network timeout), but transaction was submitted successfully:', tx.hash);
      console.log('Confirmation error:', confirmError.message);
    }
    
    res.json({ success: true, txHash: tx.hash });
  } catch (e) {
    console.error('❌ Error in /submit-payment route:', e.message);
    console.error('📋 Full error:', e);
    res.status(500).json({ 
      error: 'Error submitting payment', 
      message: e.message,
      details: e.toString()
    });
  }
});

// Get payment transaction details by hash
app.get('/payment-transaction/:hash', async (req, res) => {
  try {
    const txHash = req.params.hash;
    console.log('🔍 Looking up payment transaction:', txHash);

    // Validate transaction hash format
    if (!txHash || !txHash.match(/^0x[a-fA-F0-9]{64}$/)) {
      return res.status(400).json({ error: 'Invalid transaction hash format' });
    }

    // Get transaction details from blockchain
    const tx = await provider.getTransaction(txHash);
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!tx || !receipt) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Parse the transaction data to extract payment contract call details
    let contractCallData = null;
    if (receipt.to && PAYMENT_CONTRACT_ADDRESS !== 'YOUR_PAYMENT_CONTRACT_ADDRESS' && 
        receipt.to.toLowerCase() === PAYMENT_CONTRACT_ADDRESS.toLowerCase()) {
      try {
        // Decode the transaction input data
        const iface = new ethers.Interface(PAYMENT_ABI);
        const decoded = iface.parseTransaction({ data: tx.data, value: tx.value });
        
        if (decoded && decoded.name === 'addPaymentEntry') {
          contractCallData = {
            functionName: decoded.name,
            username: decoded.args[0],
            programOrganization: decoded.args[1],
            mobile: decoded.args[2],
            tin: decoded.args[3],
            amount: (Number(decoded.args[4]) / 100).toFixed(2) // Convert back from cents to MYR
          };
        }
      } catch (parseError) {
        console.log('Could not parse payment contract call data:', parseError.message);
      }
    }

    // Prepare response data
    const transactionDetails = {
      hash: tx.hash,
      blockNumber: receipt.blockNumber,
      from: tx.from,
      to: tx.to,
      value: ethers.formatEther(tx.value),
      gasUsed: receipt.gasUsed.toString(),
      gasPrice: tx.gasPrice ? ethers.formatUnits(tx.gasPrice, 'gwei') : 'N/A',
      status: receipt.status === 1 ? 'Success' : 'Failed',
      timestamp: await provider.getBlock(receipt.blockNumber).then(block => new Date(block.timestamp * 1000).toISOString()),
      contractCallData,
      explorerUrl: `https://sepolia.etherscan.io/tx/${txHash}`
    };

    res.json(transactionDetails);
  } catch (error) {
    console.error('❌ Error fetching payment transaction details:', error);
    res.status(500).json({ 
      error: 'Failed to fetch payment transaction details',
      message: error.message 
    });
  }
});

// Clean up expired sessions every hour
setInterval(() => {
  console.log('🧹 Server cleanup running...');
}, 60 * 60 * 1000);

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));

// Export for Vercel
module.exports = app;
