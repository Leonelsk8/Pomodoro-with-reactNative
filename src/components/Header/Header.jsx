import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header(props){
  const {currentTime, setCurrentTime, setTime, setActive} = props;

  const handlePress = (index)=>{
    const newTime = index === 0 ? 25 : index===1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
    setActive(false);
  }

  return(
    <View style={styles.viewStyle}>
      {
        options.map((item, index)=>(
          <TouchableOpacity key={index} style={[styles.itemStyle, currentTime !== index && {borderColor: "transparent"}]} onPress={()=>handlePress(index)}>
            <Text style={{fontWeight: "bold"}}>{item}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle:{
    flexDirection: "row",
  },
  itemStyle:{
    width: "33%",
    alignItems: "center",
    borderWidth: 3,
    padding: 5,
    borderColor: "white",
    marginVertical: 20,
    borderRadius: 10,
  }
})