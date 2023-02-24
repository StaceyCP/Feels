import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import MoodCard from "./MoodCard";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import { Dispatch, SetStateAction, useState } from "react";
import { todaysDate } from "../utils/todaysDate";
import { updateUserMood } from "../utils/api";

interface loggedInUser {
  _id: String;
  username: String;
  email: String;
  date_of_birth: String;
  date_joined: String;
  avatar_url: String;
  _v: Number;
  createdAt: String;
  updatedAt: String;
}

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setTodaysMood: Dispatch<SetStateAction<String>>;
  loggedInUser: loggedInUser;
  setUserMoods: Dispatch<SetStateAction<Array<Object>>>;
}

export default function Moodal({
  showModal,
  setShowModal,
  setTodaysMood,
  loggedInUser,
  setUserMoods,
}: Props) {
  const [moodDesc, setMoodDesc] = useState<String>("");

  const updateMood = (moodDesc: String) => {
    if (moodDesc === "Joyful") {
      setTodaysMood(moodDesc);
      updateUserMood(loggedInUser.username, { [todaysDate]: 3 });
    } else if (moodDesc === "Happy") {
      setTodaysMood(moodDesc);
      updateUserMood(loggedInUser.username, { [todaysDate]: 2 });
    } else if (moodDesc === "Just Okay") {
      setTodaysMood(moodDesc);
      updateUserMood(loggedInUser.username, { [todaysDate]: 1 });
    } else if (moodDesc === "Neutral") {
      setTodaysMood(moodDesc);
      updateUserMood(loggedInUser.username, { [todaysDate]: 0 });
    } else if (moodDesc === "A Bit Low") {
      setTodaysMood(moodDesc);
      updateUserMood(loggedInUser.username, { [todaysDate]: -1 });
    } else if (moodDesc === "Sad") {
      setTodaysMood(moodDesc);
      updateUserMood(loggedInUser.username, { [todaysDate]: -2 });
    } else if (moodDesc === "Depressed") {
      setTodaysMood(moodDesc);
      updateUserMood(loggedInUser.username, { [todaysDate]: -3 });
    }
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        presentationStyle="overFullScreen"
      >
        <View style={styles.background}>
          <View style={styles.modal}>
            <Pressable
              style={styles.close}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Text style={styles.closeText}>x</Text>
            </Pressable>
            <Text style={styles.header}>Track Your Feels</Text>
            <ScrollView
              contentContainerStyle={styles.sideScroll}
              horizontal={true}
            >
              <MoodCard mood="Joyful" setMoodDesc={setMoodDesc} />
              <MoodCard mood="Happy" setMoodDesc={setMoodDesc} />
              <MoodCard mood="Just Okay" setMoodDesc={setMoodDesc} />
              <MoodCard mood="Neutral" setMoodDesc={setMoodDesc} />
              <MoodCard mood="A Bit Low" setMoodDesc={setMoodDesc} />
              <MoodCard mood="Sad" setMoodDesc={setMoodDesc} />
              <MoodCard mood="Depressed" setMoodDesc={setMoodDesc} />
            </ScrollView>
            {moodDesc !== "" && (
              <>
                <Text style={styles.text}>Feeling {moodDesc}?</Text>
                <Pressable
                  style={styles.submitButton}
                  onPress={() => {
                    console.log(moodDesc)
                    setShowModal(false);
                    updateMood(moodDesc);
                  }}
                >
                  <Text style={styles.submitButtonText}>Track</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  close: {
    alignSelf: "flex-end",
    paddingRight: 20,
    height: 30,
  },
  closeText: {
    fontSize: 26,
    marginBottom: 5,
    color: "#666",
  },
  header: {
    fontSize: 27,
    textAlign: "center",
    marginBottom: 10,
  },
  modal: {
    margin: 20,
    backgroundColor: white,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: black,
    minHeight: 300,
    maxHeight: 355,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 12,
  },
  sideScroll: {
    alignItems: "center",
    height: 200,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10
  },
  submitButton: {
    marginBottom: 23,
    backgroundColor: orange,
    padding: 6,
    marginTop: 8,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  submitButtonText: {
    fontSize: 17,
    color: white,
  },
  text: {
    fontSize: 16
  }
});