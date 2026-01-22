import { ThemeProvider } from "./components/theme-provider"
import { ThemeToggle } from "./components/ui/theme-toggle"

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center transition-colors">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          MERN RBAC Project Manager
        </h1>
      </div>
    </ThemeProvider>
  )
}

export default App
