import { useState } from "react";

const useForm = (fields = {}) => {
  const [inputs, setInputs] = useState({ ...fields });

  const handleChange = (e) => {
    const name = e.target.name;

    let value;
    switch (e.target.type) {
      case "checkbox":
        value = e.target.checked;
        break;
      case "file":
        value = e.target.files[0];
        break;
      default:
        value = e.target.value;
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  return { inputs, setInputs, handleChange };
};

export default useForm;
