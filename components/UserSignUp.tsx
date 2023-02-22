import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
const { lightBlue, blue, orange, black, white } = require("../assets/colours");

interface UserDetails {
  username: string;
  email: string;
  password: string;
  date_of_birth: string;
}

interface Props {
  hidden: boolean;
  setDetails: Dispatch<SetStateAction<UserDetails | null>>;
}

const UserSignUp = ({ hidden, setDetails }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <View style={hidden ? styles.hidden : styles.container}>
      <FormInput
        onChange={setUsername}
        placeholder="Username..."
        label="Username"
      />
      <FormInput onChange={setEmail} placeholder="Email..." label="Email" />
      <FormInput
        onChange={setPassword}
        placeholder="Password"
        label="Password"
        secure
      />
      <View>
        <Text style={styles.text}>Date of Birth</Text>
        <View style={styles.DOBcontainer}>
          <FormInput onChange={setDay} placeholder="  DD  " label="" isNumber />
          <FormInput
            onChange={setMonth}
            placeholder="  MM  "
            label=""
            isNumber
          />
          <FormInput onChange={setYear} placeholder="YYYY" label="" isNumber />
        </View>
      </View>
      <LoginPressable
        text="Sign up"
        onPress={() => {
          setDetails({
            username,
            email,
            password,
            date_of_birth: `${day}/${month}/${year}`,
          });
        }}
        isPrimary={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    // alignItems: "center",
    alignSelf: "stretch",
  },
  DOBcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    // textAlign: "center",
    marginBottom: -12,
    color: white,
  },
  hidden: {
    display: "none",
  },
});
// username
// email
// date of birth
// password

export default UserSignUp;
