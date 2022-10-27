import { LiteCreditCardInput } from "react-native-credit-card-input-plus";

export const CreditCardInput = () => {
  const onChange = (formData) => {
    const { value, status } = formData;

    const isIncomplete = Object.values(status).include("incomplete");
    console.log(formData);
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
