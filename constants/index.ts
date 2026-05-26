import digitalBank from "../assets/icons/digital-banking.png"
import cashApp from "../assets/icons/money.png"
import save from '../assets/icons/save.png'
import loan from '../assets/icons/loan.png'
import invest from '../assets/icons/invest.png'

import home from '../assets/icons/home.png'
import send from '../assets/icons/paperplane.png'
import pay from '../assets/icons/payslip.png'
import cards from '../assets/icons/cards.png'
import more from '../assets/icons/more.png'
import backgroundCover from '../assets/icons/backgroundCover.jpeg'
import profile from '../assets/icons/profile.jpeg'
import message from '../assets/icons/message.png'
import search from '../assets/icons/search.png'
import moniepoint from '../assets/icons/moniepoint.jpeg'
import access from '../assets/icons/access.png'
import firstbank from '../assets/icons/firstbank.png'
import zenith from '../assets/icons/zenith.png'
import kuda from '../assets/icons/kuda.png'
import secure from '../assets/icons/secure.png'
import id from '../assets/icons/id.png'
import location from '../assets/icons/location.png'
import cardStack from '../assets/icons/cardStack.png'
import fireBackground from '../assets/icons/fireBackground.png'
import eyeOn from '../assets/icons/eyeOn.png'
import eyeOff from '../assets/icons/eyeOff.png'
import passCode from '../assets/icons/passCode.png'
import education from '../assets/icons/education.png'
import reminders from '../assets/icons/reminders.png'
import hospitals from '../assets/icons/hospitals.png'

export const CAROUSEL_IMAGES = [


    {
        imageUrl: cardStack,
        title: "Do more with your money",
        description: "Pay bills, transfer fund, track spending in seconds, live the EGWALITE lifestyle"
    },
    {
        imageUrl: digitalBank,
        title: "MONEY NA WATER",
        description: "Get monthly free transfers, debit card and pay  your bills and send money across borders"
    },
    {
        imageUrl: save,
        title: "SAVE",
        description: "Earn interests on your savings and save automatically when you spend"
    },
    {
        imageUrl: loan,
        title: "LOAN",
        description: "Access flexible, reliable and transparent loans"
    },
    {
        imageUrl: invest,
        title: "INVEST",
        description: "Grow your wealth"
    },
];


export const BENEFICIARIES = [
    {
        name: "Iya Oni"
    },

    {
        name: "Chuks"
    },
    {
        name: "Yewande"
    },
    {
        name: "Michael"
    }, {
        name: "Austen"
    },
]


export const RECENT_TRANSACTIONS = [
    {
        accountName: "Tasty Plus Kitchen By Unicusone",
        direction: 'credit',
        icon: moniepoint,
        amount: 2000,
        status: 'pending',
        time: new Date(),
    },
    {
        accountName: "Oladoke",
        direction: 'debit',
        icon: access,
        amount: 2000,
        status: 'pending',
        time: new Date(),

    },
    {
        accountName: "American snacks",
        direction: 'credit',
        icon: firstbank,
        amount: 2000,
        status: 'success',
        time: new Date(),

    },
    {
        accountName: "Chemist flow",
        direction: 'debit',
        icon: zenith,
        amount: 2000,
        status: 'pending',
        time: new Date(),

    },
    {
        accountName: "Any fucking body",
        direction: 'credit',
        icon: kuda,
        amount: 2000,
        status: 'pending',
        time: new Date(),

    },
]


export const TAB_ICONS = {
    home, send, pay, cards, more, backgroundCover,
    profile, message, search, secure, location, id, fireBackground, eyeOff, eyeOn,
    passCode, education, reminders, hospitals
}


export const TRANSFER_MODES = [
    {
        title: "Eqwafin To Egwafin",
        description: 'Always free,no transfer fees',
        icon: kuda,
    },
    {
        title: "Send To Any Bank Account",
        description: 'Send to a local bank account',
        icon: kuda,
    },
]


export const BANK_LIST = [
    "Access Bank",
    "Citibank Nigeria",
    "Ecobank Nigeria",
    "Fidelity Bank",
    "First Bank of Nigeria",
    "First City Monument Bank (FCMB)",
    "Globus Bank",
    "Guaranty Trust Bank (GTBank)",
    "Heritage Bank",
    "Jaiz Bank",
    "Keystone Bank",
    "Parallex Bank",
    "Polaris Bank",
    "Providus Bank",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank Nigeria",
    "Sterling Bank",
    "Suntrust Bank Nigeria",
    "TAJBank",
    "Titan Trust Bank",
    "Union Bank of Nigeria",
    "United Bank for Africa (UBA)",
    "Unity Bank",
    "Wema Bank",
    "Zenith Bank",
    "AB Microfinance Bank Nigeria",
    "Accion Microfinance Bank",
    "FairMoney Microfinance Bank",
    "RenMoney Microfinance Bank",
    "Sparkle Microfinance Bank",
    "ALAT by Wema",
    "Kuda Bank",
    "Mint Finex (Mint)",
    "One Finance",
    "Rubies Bank",
    "VFD Microfinance Bank",
    "9PSB",
    "Hope PSB",
    "MoneyMaster PSB",
    "SmartCash PSB",
    "Coronation Merchant Bank",
    "FBNQuest Merchant Bank",
    "FSDH Merchant Bank",
    "Nova Merchant Bank",
    "Rand Merchant Bank",
    "Bank of Industry (BOI)",
    "Federal Mortgage Bank of Nigeria",
    "Nigeria Export-Import Bank (NEXIM)",
    "Development Bank of Nigeria",
    "Nigeria Agricultural Cooperative and Rural Development Bank",
    "National Economic Reconstruction Fund (NERFUND)"
]


export const BENEFICIARY_TRANSACTION_HISTORY = [
    {
        amount: 2000,
        narration: 'Jordan\'s school fees',
        receiver: '1381259773',
        sender: '3140126489',
        mode: 'debit'
    },
    {
        amount: 40000,
        narration: 'flexing',
        sender: '1381259773',
        receiver: '3140126489',
        mode: 'credit'
    },
    {
        amount: 3000,
        narration: 'Gift',
        sender: '1381259773',
        receiver: '3140126489',
        mode: 'credit'
    },
    {
        amount: 10000000,
        narration: 'Salary',
        sender: '1381259773',
        receiver: '3140126489',
        mode: 'credit'
    },
    {
        amount: 2000,
        narration: 'Jordan\'s school fees',
        sender: '3140126489',
        receiver: '1381259773',
        mode: 'debit'
    },
]


export const TransactionHistory = [
    {
        name: "Olalekan",
        amount: "15.99",
        time: new Date().toLocaleDateString(),
        type: "inward"
    },
    {
        name: "Olalekan",
        amount: "15.99",
        time: new Date().toLocaleDateString(),
        type: "inward"
    },
    {
        name: "Olalekan",
        amount: "15.99",
        time: new Date().toLocaleDateString(),
        type: "inward"
    },
    {
        name: "Olalekan",
        amount: "15.99",
        time: new Date().toLocaleDateString(),
        type: "inward"
    },
    {
        name: "Olalekan",
        amount: "15.99",
        time: new Date().toLocaleDateString(),
        type: "outward"
    },
    {
        name: "Olalekan",
        amount: "15.99",
        time: new Date().toLocaleDateString(),
        type: "outward"
    },
    {name: "Yewande", amount: "5.75", time: new Date().toISOString(), type: "outward"},
    {name: "Chukuwka", amount: " 3,500", time: new Date().toISOString(), type: "outward"},
    {name: "Austen", amount: " 89.99", time: new Date().toISOString(), type: "outward"},
]