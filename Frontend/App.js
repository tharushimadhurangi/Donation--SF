import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message"; // ✅ Import toast

import Login from "./Screens/Login";
import RegisterScreen from "./Screens/RegisterScreen";
import ForgotPassword from "./Screens/ForgotPassword";
import Home from "./Screens/Home";
import Start from "./Screens/Start";
import Categorie from "./Screens/Category";
import News from "./Screens/News";
import Childern from "./Screens/Childern";
import DonationForm from "./Screens/DonationForm";
import Successpage from "./Screens/Successpage";
import DonationRequest from "./Screens/DonationRequest";
import Profile from "./Screens/Profile";
import DonationHistory from "./Screens/DonationHistory";
import Blood from "./Screens/Blood";
import RequestBlood from "./Screens/RequestBlood";
import DonorRegistration from "./Screens/DonorRegistration";
import BloodSearchScreen from "./Screens/BloodSearchScreen";
import PayPal from "./Screens/Paypal";
import AdminPanel from "./Screens/AdminPanel";
import NotificationsScreen from "./Screens/NotificationsScreen";
import AdminBloodRequestList from "./Screens/AdminBloodRequestList";
import Volunteer from "./Screens/Volunteer";
import Volunteerhome from "./Screens/Volunteerhome";
import ReceiptScreen from "./Screens/ReceiptScreen";
import DonationRequstpepole from "./Screens/DonationRequstpepole";
import Medical from "./Screens/Medical";
import Animal from "./Screens/Animal";
import OnboardingScreen from "./Screens/OnboardingScreen";
import Menu from "./Screens/Menu";
import DonationSummaryScreen from "./Screens/DonationSummaryScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
        <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: "Reset Password" }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="DonationRequest" component={DonationRequest} options={{ headerShown: false }} />
        <Stack.Screen name="DonationSummaryScreen" component={DonationSummaryScreen} options={{ title: "Donation Summary" }} />
        <Stack.Screen name="Categorie" component={Categorie} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Childern" component={Childern} />
        <Stack.Screen name="DonationForm" component={DonationForm} options={{ title: "Donation Form" }} />
        <Stack.Screen name="Successpage" component={Successpage} options={{ title: "Success" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
        <Stack.Screen name="DonationHistory" component={DonationHistory} options={{ title: "Donation History" }} />
        <Stack.Screen name="RequestBlood" component={RequestBlood} options={{ title: "RequestBlood" }} />
        <Stack.Screen name="Blood" component={Blood} options={{ title: "Blood" }} />
        <Stack.Screen name="DonorRegistration" component={DonorRegistration} options={{ title: "DonorRegistration" }} />
        <Stack.Screen name="BloodSearchScreen" component={BloodSearchScreen} options={{ title: "BloodSearchScreen" }} />
        <Stack.Screen name="Paypal" component={PayPal} options={{ title: "PaywithPaypal" }} />
        <Stack.Screen name="AdminPanel" component={AdminPanel} options={{ title: "AdminPanel" }} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ title: "NotificationsScreen" }} />
        <Stack.Screen name="AdminBloodRequestList" component={AdminBloodRequestList} options={{ title: "Blood Requests" }} />
        <Stack.Screen name="Volunteer" component={Volunteer} options={{ title: "Volunteer" }} />
        <Stack.Screen name="Volunteerhome" component={Volunteerhome} options={{ title: "Volunteerhome" }} />
        <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} options={{ title: "ReceiptScreen" }} />
        <Stack.Screen name="DonationRequstpepole" component={DonationRequstpepole} options={{ title: "DonationRequstpepole" }} />
        <Stack.Screen name="Medical" component={Medical} options={{ title: "Medical" }} />
        <Stack.Screen name="Animal" component={Animal} options={{ title: "Animal" }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ title: "OnboardingScreen" }} />
        <Stack.Screen name="Menu" component={Menu} options={{ title: "Menu" }} />
      </Stack.Navigator>

      {/* ✅ Add toast here so it works globally */}
      <Toast />
    </NavigationContainer>
  );
}
