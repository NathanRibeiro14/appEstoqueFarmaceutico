import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

let idCounter = 1000;

const App = () => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [estoque, setEstoque] = useState([]);
  const [detalheItem, setDetalheItem] = useState(null);

  const adicionarItem = () => {
    if (nome.trim() && valor.trim() && quantidade.trim()) {
      const novoItem = { id: idCounter++, nome, valor, quantidade: parseInt(quantidade) };
      if (idCounter > 9999) {
        Alert.alert('Erro', 'Limite de itens atingido.');
        return;
      }
      setEstoque([...estoque, novoItem]);
      setNome('');
      setValor('');
      setQuantidade('');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
    }
  };

  const mostrarDetalhes = (item) => {
    setDetalheItem(item);
  };

  const fecharDetalhes = () => {
    setDetalheItem(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque Farmacêutico</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputNome}
          placeholder="Nome do item"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.inputValor}
          placeholder="Valor"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputQuantidade}
          placeholder="Qtd"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
      </View>
      <Button title="Adicionar" onPress={adicionarItem} />
      <FlatList
        data={estoque}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => mostrarDetalhes(item)}>
            <Text>{item.nome} - R${item.valor} - Qtd: {item.quantidade}</Text>
          </TouchableOpacity>
        )}
      />
      {detalheItem && (
        <View style={styles.detalhesContainer}>
          <Text style={styles.detalhesTitle}>Detalhes do Item</Text>
          <Text>Código: {detalheItem.id}</Text>
          <Text>Nome: {detalheItem.nome}</Text>
          <Text>Valor: R${detalheItem.valor}</Text>
          <Text>Quantidade: {detalheItem.quantidade}</Text>
          <Button title="Fechar" onPress={fecharDetalhes} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputNome: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 3,
  },
  inputValor: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 80,
    borderRadius: 3,
  },
  inputQuantidade: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 80,
    borderRadius: 3,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  detalhesContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 20,
  },
  detalhesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;