import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');
const operators = ['+', '-', '*', '/'];

const HomeScreen = () => {
  const buttons = [
    { key: 'clear', value: 'C' },
    { key: 'delete', value: 'D' },
    { key: 'division', value: '/' },
    { key: 'multiplication', value: '*' },
    { key: 'seven', value: '7' },
    { key: 'eight', value: '8' },
    { key: 'nine', value: '9' },
    { key: 'subtraction', value: '-' },
    { key: 'four', value: '4' },
    { key: 'five', value: '5' },
    { key: 'six', value: '6' },
    { key: 'addition', value: '+' },
    { key: 'one', value: '1' },
    { key: 'two', value: '2' },
    { key: 'three', value: '3' },
    { key: 'dot', value: '.' },
    { key: 'zero', value: '0' },
    { key: 'doubleZero', value: '00' },
    { key: 'equal', value: '=' },
  ];

  const [currentValue, setCurrentValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState('');
  const [result, setResult] = useState(null);
  const [expression, setExpression] = useState('0');

  // useEffect(() => {
  //   console.log('0====================================0');
  //   console.log(`currentValue: ${currentValue}`);
  //   console.log(`expression: ${expression}`);
  //   console.log(`operator: ${operator}`);
  //   console.log(`previousValue: ${previousValue}`);
  //   console.log(`result: ${result}`);
  // }, [currentValue, expression, operator, previousValue, result]);


  const handleInput = (buttonValue) => {
    console.log('3====================================3');
    if (buttonValue === 'C') {
      console.log('====================================');
      resetCalculator();
    }
    else if (buttonValue === 'D') {
      console.log('4====================================4');
      setCurrentValue(currentValue.slice(0, -1) || '0');
      setExpression(expression.slice(0, -1));
    }
    else if (operators.includes(buttonValue)) {
      console.log('5====================================5');

      if (operator !== null) {
        console.log('6====================================6');
        console.log(`object1 ---> ${currentValue}`);
        console.log(`object2 ---> ${previousValue}`);
        const intermediateResult = executeCalculation();
        setPreviousValue(intermediateResult);
        setCurrentValue('');
        setResult(intermediateResult);
        setExpression(expression + buttonValue);
      }
      else if (operator === null) {
        console.log('7====================================7');
        setPreviousValue(currentValue);
        setExpression(expression + buttonValue);
        setCurrentValue('');
      }

      console.log('8====================================8');
      setOperator(buttonValue);
      console.log('operator -> ', operator);

    }
    else if (buttonValue === '.') {
      console.log('9====================================9');
      if (!currentValue.includes('.')) {
        setCurrentValue(currentValue + buttonValue);
        setExpression(expression + buttonValue);
      }
    }
    else if (buttonValue === '=') {
      console.log('10====================================10');
      if (previousValue && operator && currentValue) {
        const computedResult = executeCalculation();
        setResult(String(computedResult));
        setExpression(String(computedResult));
        setPreviousValue('');
        setOperator(null);
        setCurrentValue(String(computedResult));
      }
    }
    else {
      if (currentValue === '0') {
        console.log('1====================================1');
        setCurrentValue(buttonValue);
        setExpression(buttonValue);
      }
      else {
        console.log('2====================================2');
        setCurrentValue(currentValue + buttonValue);
        setExpression(expression + buttonValue);
      }
    }
  };



  const executeCalculation = () => {
    const numCurrentValue = parseFloat(currentValue || '0');
    const numPreviousValue = parseFloat(previousValue || '0');

    let computedResult = 0;
    switch (operator) {
      case '+':
        computedResult = numPreviousValue + numCurrentValue;
        break;
      case '-':
        computedResult = numPreviousValue - numCurrentValue;
        break;
      case '*':
        computedResult = numPreviousValue * numCurrentValue;
        break;
      case '/':
        computedResult = (numPreviousValue / numCurrentValue).toFixed(10);
        break;
      default:
        return;
    }

    return computedResult;
  };

  const resetCalculator = () => {
    setCurrentValue('0');
    setOperator(null);
    setPreviousValue(null);
    setResult('');
    setExpression('0');
  };

  const displayButton = ({ item }) => {
    const buttonStyle = [styles.button];
    if (item.value === '=') {
      buttonStyle.push(styles.equalButton);
    } else if (operators.includes(item.value)) {
      buttonStyle.push(styles.operatorButton);
    }
    return (
      <TouchableOpacity style={buttonStyle} onPress={() => handleInput(item.value)}>
        <Text style={styles.buttonText}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upwardContainer}>
        <Text style={styles.displayText}>{expression}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.downwardContainer}>
        <FlatList
          data={buttons}
          renderItem={displayButton}
          keyExtractor={(item) => item.key}
          numColumns={4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  upwardContainer: {
    height: height / 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  displayText: {
    color: 'white',
    fontSize: 28,
  },
  resultText: {
    color: 'white',
    fontSize: 48,
  },
  downwardContainer: {
    flex: 1,
    marginTop: 20,
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  equalButton: {
    backgroundColor: 'red',
  },
  operatorButton: {
    backgroundColor: 'grey',
  },
  buttonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;
