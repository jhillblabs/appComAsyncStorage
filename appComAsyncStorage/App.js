import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { TextInput, Button } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {
  const [nome, setNome] = useState('')
  const [nomeArmazenado, setNomeArmazenado] = useState('')

  const salvarNome = async () => {
    try {
      await AsyncStorage.setItem('@nome_usuario', nome)
      alert('Nome salvo com sucesso!')
      carregarDados()
    } catch (error) {
      console.log(error);
    }
  }

  const carregarDados = async () => {
    try {
      const valor = await AsyncStorage.getItem('@nome_usuario')
      if(valor != null){
        setNomeArmazenado(valor)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Usar useEffect para carregar o nome ao iniciar o aplicativo
  useEffect(() => {
    carregarDados()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Nome armazenado: {nomeArmazenado}</Text>
      <TextInput
        placeholder='Digite seu nome'
        value={nome}
        onChangeText={setNome}
        style={styles.input} />
        <Button title='Salvar nome'
          onPress={salvarNome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
