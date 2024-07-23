// Ensure React is working
function TestComponent() {
    return React.createElement('div', null, 'React is working!');
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        React.createElement(TestComponent, null),
        document.getElementById('test-react')
    );

    const { WalletProvider, ConnectionProvider, WalletAdapterNetwork, useWallet } = window['@solana/wallet-adapter-react'];
    const { PhantomWalletAdapter, SolflareWalletAdapter, BackpackWalletAdapter } = window['@solana/wallet-adapter-wallets'];
    const { WalletModalProvider, WalletMultiButton } = window['@solana/wallet-adapter-ant-design'];

    if (!WalletProvider || !ConnectionProvider || !WalletAdapterNetwork) {
        console.error('Wallet adapter scripts are not loaded properly.');
        return;
    }

    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = 'https://api.mainnet-beta.solana.com';

    const wallets = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new BackpackWalletAdapter()
    ];

    function Wallet() {
        const { connected, publicKey } = useWallet();
        return React.createElement('div', null,
            React.createElement(WalletMultiButton, null),
            connected && React.createElement('p', null, `Connected: ${publicKey.toBase58()}`)
        );
    }

    function App() {
        return React.createElement(ConnectionProvider, { endpoint: endpoint },
            React.createElement(WalletProvider, { wallets: wallets, autoConnect: true },
                React.createElement(WalletModalProvider, null,
                    React.createElement(Wallet, null)
                )
            )
        );
    }

    ReactDOM.render(React.createElement(App, null), document.getElementById('wallet-button'));
});
