import { useGetBalance } from "@/hooks"
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design"
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Copy } from "lucide-react"

export const NavBar = () => {
  const { connected, account } = useWallet()
  const balance = useGetBalance(account!)

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Gaming</h1>
          {connected && account && balance.data && (
            <div className="bg-gray-800 rounded-lg p-2">
              <p className="text-lg font-semibold">
                {balance.data} <span className="text-blue-400">APT</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-400">~</span>
                <span className="text-green-400">
                  {" $ "}
                  {(Number(balance.data.toFixed(2)) * 6.37).toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <WalletSelector />
          {connected && account ? (
            <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-2">
              <p className="text-sm">
                {account.address.slice(0, 6) + "..." + account.address.slice(-4)}
              </p>
              <button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(account.address)
                  alert("Copied to clipboard")
                }}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <p className="text-gray-400">No wallet connected</p>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar;