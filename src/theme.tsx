import { useState, useEffect, useContext, createContext, ReactNode } from 'react';

interface ThemeContextProps {
  theme: string;
  handleTheme: (newTheme?: string, newBrand?: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface FutureProps {
  brand?: string;
  themeName?: string;
  children?: ReactNode | null;
}

export function FutureProvider({
  brand = "future",
  themeName = 'default',
  children
}: FutureProps) {
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    changeTheme(brand, themeName);
  }, [brand, themeName]);

  async function changeTheme(newBrand: string, newTheme: string) {
    const globalTokens = await import('tokens/globals');
    let brandTokens;

    try {
      brandTokens = await import(`tokens/${newBrand}/${newTheme}`);
    } catch (err) {
      console.error(`Brand ${newBrand} or ${newTheme} doesn't exist`, err);
      newBrand = 'future';
      newTheme = 'default';
      brandTokens = await import('tokens/future/default');
    }
    setTheme({
      brand: newBrand,
      theme: newTheme,
      tokens: {
        globalTokens: globalTokens,
        brandTokens: brandTokens
      }
    });
  }

  function handleTheme(newTheme: string = themeName, newBrand: string = brand) {
    changeTheme(newBrand, newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {theme && children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
