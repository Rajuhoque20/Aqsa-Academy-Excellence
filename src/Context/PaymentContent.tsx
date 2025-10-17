import { createContext, ReactNode, useContext } from "react";

// 1️⃣ Define the context type
type PaymentContextType = {
  monthly_fees?: number;
};

// 2️⃣ Create the context
export const PaymentContext = createContext<PaymentContextType | null>(null);

// 3️⃣ Define props for the provider
type PaymentContextProviderProps = {
  children: ReactNode;
  monthly_fees?: number;
};

// 4️⃣ Create the provider component
export const PaymentContextProvider = ({
  children,
  monthly_fees,
}: PaymentContextProviderProps) => {
  return (
    <PaymentContext.Provider value={{ monthly_fees }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within PaymentContextProvider");
  }
  return context;
};
