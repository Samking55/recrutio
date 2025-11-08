import { Text, View, Pressable, Platform } from "react-native";
import colors from "../../assets/styles/colors";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AuthApi from "../../api/authapi";
import Loader from "../../components/loader";
import Input from "../../components/input";
import LongTextInput from "../../components/long-text-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserApi from "../../api/userapi";

function PersonalInfoScreen() {
  const [enableInput, setEnableInput] = useState(false);
  const [userData, setUserData] = useState(null);

  // input value list
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [description, setDescription] = useState();

  const {
    data: userInfo,
    isPending: userInfoPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["UserInfo", Date.now()],
    queryFn: AuthApi.userInfo,
    retry: false,
  });

  // update input with the value from user personal data
  useEffect(() => {
    if (isSuccess) {
      // console.log("User personnal info succeed", userInfo);
      setFirstName(userInfo.response.first_name);
      setLastName(userInfo.response.last_name);
      setEmail(userInfo.response.email);
      setPhone(userInfo.response.phone);
      setCountry(userInfo.response.country);
      setCity(userInfo.response.city);
      setDescription(userInfo.response.description);
    }
    if (isError) console.log("An error occured within the personal info query");
  }, [isSuccess, isError]);

  // user update info mutation
  const updateInfoMutation = useMutation({
    mutationKey: ["updateUserInfo"],
    mutationFn: (body) => UserApi.updateUser(body),
  });

  // user save input function
  const saveInput = () => {
    setEnableInput(false);

    // udpate user info
    updateInfoMutation.mutate({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      country: country,
      city: city,
      description: description,
    });
  };

  // handle response for update mutation
  useEffect(() => {
    if (updateInfoMutation.isSuccess) {
      console.log("Updating user data succeed");
      console.log(updateInfoMutation.data.response);

      // update all input fields with the new data
      setFirstName(updateInfoMutation.data.response.first_name);
      setLastName(updateInfoMutation.data.response.last_name);
      setEmail(updateInfoMutation.data.response.email);
      setPhone(updateInfoMutation.data.response.phone);
      setCountry(updateInfoMutation.data.response.country);
      setCity(updateInfoMutation.data.response.city);
      setDescription(updateInfoMutation.data.response.description);
    }

    // set back the input to the default value
    if (updateInfoMutation.isError) {
      console.log("Update user info failed");
      console.log(updateInfoMutation.error);
      setFirstName(userInfo?.response?.first_name);
      setLastName(userInfo?.response?.last_name);
      setEmail(userInfo?.response?.email);
      setPhone(userInfo?.response?.phone);
      setCountry(userInfo?.response?.country);
      setCity(userInfo?.response?.city);
      setDescription(userInfo?.response?.description);
    }
  }, [updateInfoMutation.isSuccess, updateInfoMutation.isError]);

  // handle request peding state and conditional render

  if (userInfoPending) return <Loader />;
  if (updateInfoMutation.isPending) return <Loader />;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: colors.white,
        padding: 16,
      }}
      enableOnAndroid={true}
      extraScrollHeight={90} // lifts the view more when keyboard appears
      keyboardShouldPersistTaps="handled"
    >
      {/* title */}
      <View style={{ marginBottom: 25 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Vos informations personnelles
        </Text>
      </View>

      {/* inputs */}
      <Input
        label="Nom"
        marginBottom={14}
        state={enableInput}
        value={lastName}
        updateInput={setLastName}
      />
      <Input
        label="Prénom"
        marginBottom={14}
        state={enableInput}
        value={firstName}
        updateInput={setFirstName}
      />
      <Input
        label="Email"
        marginBottom={14}
        state={enableInput}
        value={email}
        updateInput={setEmail}
      />
      <Input
        value={phone}
        label="Numéro de téléphone"
        marginBottom={14}
        state={enableInput}
        type="phone-pad"
        updateInput={setPhone}
      />
      <Input
        value={country}
        label="Pays"
        marginBottom={14}
        state={enableInput}
        updateInput={setCountry}
      />
      <Input
        value={city}
        label="Ville"
        marginBottom={14}
        state={enableInput}
        updateInput={setCity}
      />
      <LongTextInput
        label="Description"
        state={enableInput}
        value={description}
        updateInput={setDescription}
      />

      {/* save button */}
      <View
        style={{
          marginTop: 30,
          marginBottom: Platform.OS === "ios" ? 40 : 20, // ensures not hidden by keyboard
        }}
      >
        <Pressable
          style={{
            backgroundColor: colors.main,
            padding: 12,
            borderRadius: 7,
          }}
          onPress={() => (!enableInput ? setEnableInput(true) : saveInput())}
        >
          <Text style={{ textAlign: "center", color: colors.white }}>
            {!enableInput ? "Modifier" : "Enregistrer"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default PersonalInfoScreen;
