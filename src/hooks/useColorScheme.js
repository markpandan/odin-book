import { useContext } from "react";
import ColorSchemeContext from "../contexts/ColorSchemeContext";

const useColorScheme = () => {
  return useContext(ColorSchemeContext);
};

export default useColorScheme;
