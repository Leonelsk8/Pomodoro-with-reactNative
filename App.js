import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform, TouchableOpacity, SafeAreaView} from 'react-native';
import {useState, useEffect} from 'react';
import Header from './src/components/Header/Header';
import Timer from './src/components/Timer/Timer';
import { Audio } from 'expo-av';
import { SvgXml } from 'react-native-svg';
import githubIcon from './assets/github.svg';

const colors = ["#F7DC6F","#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [active, setActive] = useState(false);

  useEffect(()=>{
    let interval = null;

    if(active){
      interval = setInterval(()=>{
        setTime(time-1);
      }, 1000);
    }else{
      clearInterval(interval);
    }

    if(time===0){
      setActive(false);
      setIsWorking((prev) => {!prev});
      setTime(isWorking ? 300 : 1500)
    }

    return()=> clearInterval(interval);
  },[active, time]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/click.mp3')
      );
      return sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  
  const handleStartStop=()=>{
    playSound();
    setActive(!active);
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{paddingHorizontal: 15, flex:1, paddingTop: Platform.OS === "android" && 60 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime} setActive={setActive}/>
        <Timer time={time}/>
        <TouchableOpacity style={styles.button} onPress={()=>handleStartStop()}>
          <Text style={{color: "white", fontWeight: "bold"}}>{active ? "STOP" : "START"}</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <SvgXml xml={githubIcon} width={15} height={15}/>
          <Text style={styles.TextFooter}>copyright - Leonel Gomez</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:32, 
    fontWeight:"bold",
  },
  button:{
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15
  },
  footer:{
    flex:1,
    justifyContent: "flex-end"
  },
  TextFooter:{
    color: "white", 
    backgroundColor: "gray", 
    padding: 15 , 
    marginBottom:10,
    borderRadius: 15,
    textAlign: "center"
  }
});
