# Pineapple Donkey 🍍🫏

**PayHack 2025 Submission**

A blockchain-powered cashback allocation platform that empowers users to contribute to social causes while earning rewards from their purchases. Built for the PayHack 2025 hackathon, this application combines e-commerce cashback mechanisms with transparent social impact tracking through smart contracts.

## 🎯 Problem Statement

Traditional cashback systems offer monetary rewards but lack mechanisms for users to contribute to social causes. There's also limited transparency in tracking how funds flow through social programs and their actual impact.

## 💡 Solution

Pineapple Donkey bridges the gap between e-commerce rewards and social impact by:

- **Smart Cashback Allocation**: Users can choose to donate a percentage of their cashback earnings to social causes
- **Blockchain Transparency**: All transactions and social program funding are tracked on-chain for complete transparency
- **Social Impact Tracking**: Real-time monitoring of social programs with milestone-based evidence verification
- **Gamified Experience**: Users can track their contributions and see the direct impact of their donations

## 🚀 Key Features

### 🛍️ E-commerce Integration
- Multi-brand cashback system (Shopee, Lazada, Nike, Samsung, and more)
- Seamless payment processing with instant cashback calculations
- User-friendly shopping interface with real-time updates

### 💰 Flexible Cashback Allocation
- Choose allocation percentage between personal cashback and donations (0%, 25%, 50%, 75%, 100%)
- Instant visualization of fund distribution
- Multiple social cause options

### 🏥 Social Impact Programs
- **Flood Relief Fund**: Emergency disaster response funding
- **Education Fund**: Supporting educational initiatives
- **Poverty Aid**: Direct assistance to underprivileged communities
- **WWF Conservation**: Environmental and wildlife protection projects

### 🔗 Blockchain Transparency
- **PaymentTracker Smart Contract**: Records all user transactions with complete audit trail
- **SocialProgramTracker Smart Contract**: Tracks fund flow to social programs with milestone verification
- IPFS integration for evidence storage (receipts, proof of impact)

### 📊 Impact Visualization
- Turtle conservation timeline tracking
- Real-time progress updates on social programs
- Transparent fund utilization reports

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router DOM** for navigation
- **Bootstrap 5** for responsive UI design
- **Bootstrap Icons** for iconography

### Blockchain
- **Solidity** smart contracts
- **PaymentTracker Contract**: User transaction management
- **SocialProgramTracker Contract**: Social program fund tracking
- **IPFS** for decentralized evidence storage

### Development Tools
- **TypeScript** for type safety
- **Vite** for modern build tooling
- **Node.js** backend services

## 🏗️ Web App Architecture

![Web App Architecture](Screenshot%202025-07-19%20034611.png)

The Pineapple Donkey platform follows a modern, scalable architecture designed for PayHack 2025:

### Architecture Components

#### **Frontend Layer**
- **React SPA**: Single-page application with component-based architecture
- **Responsive UI**: Bootstrap-powered interface optimized for mobile and desktop
- **State Management**: React hooks for efficient state handling
- **Routing**: Client-side routing with React Router DOM

#### **Backend Services**
- **API Gateway**: RESTful API endpoints for frontend communication
- **Authentication**: MyDigitalID integration for secure user login
- **Payment Processing**: Integration with e-commerce platforms (Shopee, Lazada, etc.)
- **IPFS Gateway**: Decentralized storage interface for evidence files

#### **Blockchain Layer**
- **Smart Contracts**: Solidity-based contracts on Ethereum-compatible networks
  - `PaymentTracker.sol`: Transaction recording and audit trails
  - `SocialProgramTracker.sol`: Social impact fund tracking
- **Web3 Integration**: MetaMask connectivity for blockchain interactions
- **IPFS Network**: Distributed storage for receipts and impact evidence

#### **Data Flow**
1. **User Authentication** → MyDigitalID verification
2. **Shopping & Payments** → Brand partner APIs → Payment processing
3. **Cashback Calculation** → Smart contract execution → Blockchain recording
4. **Impact Tracking** → IPFS evidence storage → Social program updates
5. **Transparency Reporting** → Blockchain queries → Real-time dashboard updates

## 📁 Project Structure

```
pineapple-donkey/
├── src/                          # Frontend React application
│   ├── components/               # React components
│   │   ├── Homepage.tsx         # Main landing page with brand showcase
│   │   ├── ShopeePage.tsx       # Shopping interface
│   │   ├── CashbackAllocatePage.tsx # Cashback allocation UI
│   │   ├── TurtleTimelinePage.tsx   # Conservation impact tracking
│   │   └── ...
│   ├── assets/                  # Static assets
│   │   ├── brands/             # Brand logos and assets
│   │   ├── social-projects/    # Social cause imagery
│   │   ├── evidence/           # Impact evidence photos
│   │   └── timeline/           # Timeline visualization assets
│   └── ...
├── smart-contracts/             # Blockchain smart contracts
│   ├── contracts/
│   │   ├── PaymentTracker.sol  # User payment tracking
│   │   └── SocialProgramTracker.sol # Social program fund tracking
│   └── ...
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite build configuration
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Web3 wallet (MetaMask recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zhenhao23/pineapple-donkey.git
   cd pineapple-donkey
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

### Smart Contract Deployment

1. **Navigate to smart contracts directory**
   ```bash
   cd smart-contracts
   npm install
   ```

2. **Deploy contracts**
   ```bash
   # Configure your network settings
   # Deploy PaymentTracker and SocialProgramTracker contracts
   npm run deploy
   ```

## 🎮 How to Use

1. **Login**: Access the platform through the MyDigitalID integration
2. **Shop**: Browse and purchase from partner brands
3. **Allocate**: Choose how to split your cashback between personal rewards and donations
4. **Track Impact**: Monitor your contributions and their real-world impact
5. **Verify**: View blockchain records for complete transparency

## 🌟 PayHack 2025 Innovation Points

### 🎯 Problem-Solution Fit
- Addresses real-world challenges in social impact transparency
- Combines fintech rewards with social good
- Creates sustainable funding mechanisms for NGOs

### 🔐 Blockchain Integration
- Immutable transaction records
- Transparent fund tracking
- Decentralized evidence storage via IPFS

### 🚀 User Experience
- Intuitive allocation interface
- Gamified impact tracking
- Mobile-responsive design

### 📈 Scalability
- Multi-brand integration capability
- Extensible smart contract architecture
- Real-time impact visualization

## 🏆 Awards & Recognition

**PayHack 2025 Submission** - Demonstrating innovation in blockchain-powered social impact platforms.

## 👥 Team

Developed by the Pineapple Donkey team for PayHack 2025.

## 📄 License

This project is created for PayHack 2025 hackathon purposes.

## 🤝 Contributing

This is a hackathon submission. For collaboration or questions, please reach out to the team.

---

*Built with 💚 for PayHack 2025 - Empowering social impact through blockchain technology*
