import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '@/contexts/temaContexto';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';

const CATEGORIAS = [
  { id: 'entretenimento', label: 'Entretenimento', icone: 'film-outline' },
  { id: 'software', label: 'Software', icone: 'code-slash-outline' },
  { id: 'compras', label: 'Compras', icone: 'bag-outline' },
  { id: 'utilidades', label: 'Utilidades', icone: 'flash-outline' },
  { id: 'alimentacao', label: 'Alimentação', icone: 'restaurant-outline' },
  { id: 'saude', label: 'Saúde', icone: 'medkit-outline' },
  { id: 'educacao', label: 'Educação', icone: 'book-outline' },
];

const HUMORES = [
  { id: 'feliz', emoji: '😊', label: 'Feliz' },
  { id: 'ansioso', emoji: '😰', label: 'Ansioso' },
  { id: 'estressado', emoji: '😡', label: 'Estressado' },
  { id: 'cansado', emoji: '😴', label: 'Cansado' },
  { id: 'neutro', emoji: '😐', label: 'Neutro' },
];

const PERIODICIDADES = [
  { id: 'mensal', label: 'Mensal' },
  { id: 'anual', label: 'Anual' },
  { id: 'semanal', label: 'Semanal' },
];

function Estrelas({ valor, onChange, textSecundario }: { valor: number; onChange: (v: number) => void; textSecundario: string }) {
  return (
    <View style={styles.estrelasRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <TouchableOpacity key={i} onPress={() => onChange(i)} activeOpacity={0.7}>
          <Ionicons
            name={i <= valor ? 'star' : 'star-outline'}
            size={28}
            color={i <= valor ? '#f5a623' : textSecundario}
          />
        </TouchableOpacity>
      ))}
      {valor > 0 && (
        <TouchableOpacity onPress={() => onChange(0)} activeOpacity={0.7}>
          <Text style={[styles.limparTexto, { color: textSecundario }]}>Limpar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function RegistrarScreen() {
  const { isDark } = useTema();
  const cores = useCores();

  const [tipo, setTipo] = useState<'despesa' | 'assinatura'>('despesa');

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [humor, setHumor] = useState('');
  const [motivo, setMotivo] = useState('');
  const [arrependimento, setArrependimento] = useState(0);
  const [data, setData] = useState('');
  const [periodicidade, setPeriodicidade] = useState('');
  const [proximaCobranca, setProximaCobranca] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  function limparCampos() {
    setDescricao('');
    setValor('');
    setCategoria('');
    setHumor('');
    setMotivo('');
    setArrependimento(0);
    setData('');
    setPeriodicidade('');
    setProximaCobranca('');
  }

  function handleSalvar() {
    if (!valor || !descricao || !categoria) return;
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
        limparCampos();
      }, 1500);
    }, 1000);
  }

  const podeSalvar = valor && descricao && categoria &&
    (tipo === 'despesa' || (tipo === 'assinatura' && periodicidade));

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.titulo, { color: cores.textPrimario }]}>Registrar</Text>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Tipo</Text>
          <View style={styles.tipoRow}>
            <TouchableOpacity
              style={[styles.tipoBotao, tipo === 'despesa' && styles.tipoAtivo, { borderColor: cores.border }]}
              onPress={() => { setTipo('despesa'); limparCampos(); }}
              activeOpacity={0.8}
            >
              <Ionicons name="cart-outline" size={18} color={tipo === 'despesa' ? CoresFixas.branco : cores.textSecundario} />
              <Text style={[styles.tipoTexto, { color: tipo === 'despesa' ? CoresFixas.branco : cores.textSecundario }]}>
                Despesa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tipoBotao, tipo === 'assinatura' && styles.tipoAtivo, { borderColor: cores.border }]}
              onPress={() => { setTipo('assinatura'); limparCampos(); }}
              activeOpacity={0.8}
            >
              <Ionicons name="repeat-outline" size={18} color={tipo === 'assinatura' ? CoresFixas.branco : cores.textSecundario} />
              <Text style={[styles.tipoTexto, { color: tipo === 'assinatura' ? CoresFixas.branco : cores.textSecundario }]}>
                Assinatura
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Detalhes</Text>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: cores.textSecundario }]}>Nome</Text>
            <TextInput
              style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
              placeholder={tipo === 'despesa' ? 'Ex: iFood, Uber...' : 'Ex: Netflix, Spotify...'}
              placeholderTextColor={cores.textSecundario}
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>

          {tipo === 'despesa' ? (
            <View style={styles.linha}>
              <View style={[styles.campo, { flex: 1 }]}>
                <Text style={[styles.label, { color: cores.textSecundario }]}>Data</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor={cores.textSecundario}
                  keyboardType="numeric"
                  value={data}
                  onChangeText={setData}
                />
              </View>
              <View style={[styles.campo, { flex: 1 }]}>
                <Text style={[styles.label, { color: cores.textSecundario }]}>Valor (R$)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
                  placeholder="0,00"
                  placeholderTextColor={cores.textSecundario}
                  keyboardType="numeric"
                  value={valor}
                  onChangeText={setValor}
                />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.linha}>
                <View style={[styles.campo, { flex: 1 }]}>
                  <Text style={[styles.label, { color: cores.textSecundario }]}>Valor (R$)</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
                    placeholder="0,00"
                    placeholderTextColor={cores.textSecundario}
                    keyboardType="numeric"
                    value={valor}
                    onChangeText={setValor}
                  />
                </View>
                <View style={[styles.campo, { flex: 1 }]}>
                  <Text style={[styles.label, { color: cores.textSecundario }]}>Próxima cobrança</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor={cores.textSecundario}
                    keyboardType="numeric"
                    value={proximaCobranca}
                    onChangeText={setProximaCobranca}
                  />
                </View>
              </View>

              <View style={styles.campo}>
                <Text style={[styles.label, { color: cores.textSecundario }]}>Periodicidade</Text>
                <View style={styles.tipoRow}>
                  {PERIODICIDADES.map(p => (
                    <TouchableOpacity
                      key={p.id}
                      style={[
                        styles.tipoBotao,
                        periodicidade === p.id && styles.tipoAtivo,
                        { borderColor: cores.border },
                      ]}
                      onPress={() => setPeriodicidade(p.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.tipoTexto, { color: periodicidade === p.id ? CoresFixas.branco : cores.textSecundario }]}>
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Categoria</Text>
          <View style={styles.categoriaGrid}>
            {CATEGORIAS.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoriaItem,
                  { backgroundColor: cores.inputBg, borderColor: categoria === cat.id ? CoresFixas.azulClaro : cores.border },
                ]}
                onPress={() => setCategoria(cat.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={cat.icone as any}
                  size={22}
                  color={categoria === cat.id ? CoresFixas.azulClaro : cores.textSecundario}
                />
                <Text style={[styles.categoriaLabel, { color: categoria === cat.id ? CoresFixas.azulClaro : cores.textSecundario }]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Campos Emocionais (Opcional)</Text>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: cores.textSecundario }]}>
              {tipo === 'despesa' ? 'Como você estava se sentindo ao fazer essa despesa?' : 'Como você estava se sentindo ao assinar?'}
            </Text>
            <View style={styles.humorRow}>
              {HUMORES.map(h => (
                <TouchableOpacity
                  key={h.id}
                  style={[
                    styles.humorItem,
                    { borderColor: humor === h.id ? CoresFixas.azulClaro : cores.border, backgroundColor: cores.inputBg },
                  ]}
                  onPress={() => setHumor(humor === h.id ? '' : h.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.humorEmoji}>{h.emoji}</Text>
                  <Text style={[styles.humorLabel, { color: humor === h.id ? CoresFixas.azulClaro : cores.textSecundario }]}>
                    {h.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: cores.textSecundario }]}>
              {tipo === 'despesa' ? 'Motivo da despesa' : 'Motivo da assinatura'}
            </Text>
            <TextInput
              style={[styles.inputMultiline, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
              placeholder={tipo === 'despesa' ? 'Ex: Estava com fome, vi uma promoção...' : 'Ex: Preciso para trabalho, recomendação de amigo...'}
              placeholderTextColor={cores.textSecundario}
              multiline
              numberOfLines={3}
              value={motivo}
              onChangeText={setMotivo}
            />
          </View>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: cores.textSecundario }]}>Nível de arrependimento</Text>
            <Estrelas valor={arrependimento} onChange={setArrependimento} textSecundario={cores.textSecundario} />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.botao,
            !podeSalvar && styles.botaoDesabilitado,
            sucesso && styles.botaoSucesso,
          ]}
          onPress={handleSalvar}
          disabled={carregando || !podeSalvar}
          activeOpacity={0.85}
        >
          {carregando ? (
            <ActivityIndicator color={CoresFixas.branco} />
          ) : sucesso ? (
            <>
              <Ionicons name="checkmark-outline" size={20} color={CoresFixas.branco} />
              <Text style={styles.botaoTexto}>Salvo!</Text>
            </>
          ) : (
            <Text style={styles.botaoTexto}>
              {tipo === 'despesa' ? 'Adicionar Despesa' : 'Adicionar Assinatura'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
  },
  tipoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tipoBotao: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  tipoAtivo: {
    backgroundColor: CoresFixas.azul,
    borderColor: CoresFixas.azul,
  },
  tipoTexto: {
    fontSize: 14,
    fontWeight: '600',
  },
  linha: {
    flexDirection: 'row',
    gap: 10,
  },
  campo: { gap: 6 },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputMultiline: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoriaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoriaItem: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  categoriaLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  humorRow: {
    flexDirection: 'row',
    gap: 6,
  },
  humorItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  humorEmoji: {
    fontSize: 20,
  },
  humorLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  estrelasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  limparTexto: {
    fontSize: 13,
    marginLeft: 4,
  },
  botao: {
    backgroundColor: CoresFixas.azul,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: CoresFixas.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoDesabilitado: {
    opacity: 0.4,
  },
  botaoSucesso: {
    backgroundColor: '#2ecc71',
  },
  botaoTexto: {
    color: CoresFixas.branco,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});