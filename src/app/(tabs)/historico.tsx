import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_HISTORICO = [
  { id: '1', descricao: 'iFood', valor: 45.9, tipo: 'despesa', categoria: 'Alimentação', emoji: '😰', data: '08/09/2026' },
  { id: '2', descricao: 'Netflix', valor: 55.9, tipo: 'assinatura', categoria: 'Entretenimento', emoji: '😐', data: '07/09/2026' },
  { id: '3', descricao: 'Mercado', valor: 187.5, tipo: 'despesa', categoria: 'Alimentação', emoji: '😊', data: '06/09/2026' },
  { id: '4', descricao: 'Spotify', valor: 21.9, tipo: 'assinatura', categoria: 'Entretenimento', emoji: '😴', data: '05/09/2026' },
  { id: '5', descricao: 'Uber', valor: 32.0, tipo: 'despesa', categoria: 'Transporte', emoji: '😡', data: '04/09/2026' },
  { id: '6', descricao: 'Farmácia', valor: 67.3, tipo: 'despesa', categoria: 'Saúde', emoji: '😰', data: '03/09/2026' },
  { id: '7', descricao: 'Adobe', valor: 89.9, tipo: 'assinatura', categoria: 'Software', emoji: '😊', data: '02/09/2026' },
  { id: '8', descricao: 'Restaurante', valor: 120.0, tipo: 'despesa', categoria: 'Alimentação', emoji: '😊', data: '01/09/2026' },
];

function ListaLancamentos({ itens, isDark }: { itens: typeof MOCK_HISTORICO; isDark: boolean }) {
  const card = isDark ? '#111f35' : '#ffffff';
  const border = isDark ? '#1e3050' : '#dde8f5';
  const inputBg = isDark ? '#0d1a2e' : '#f5f9ff';
  const textPrimary = isDark ? '#e8f0fe' : '#0d1b2a';
  const textSecondary = isDark ? '#6b8aaa' : '#5a7a9a';

  if (itens.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={[styles.vazioTexto, { color: textSecondary }]}>Nenhum registro ainda</Text>
      </View>
    );
  }

  return (
    <>
      {itens.map((item, index) => (
        <View key={item.id}>
          {index > 0 && <View style={[styles.separador, { backgroundColor: border }]} />}
          <View style={styles.lancamentoRow}>
            <View style={[styles.emojiContainer, { backgroundColor: inputBg }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.lancamentoInfo}>
              <Text style={[styles.lancamentoNome, { color: textPrimary }]}>{item.descricao}</Text>
              <View style={styles.lancamentoMeta}>
                <Text style={[styles.lancamentoCategoria, { color: textSecondary }]}>{item.categoria}</Text>
                <Text style={[styles.ponto, { color: textSecondary }]}>·</Text>
                <Text style={[styles.lancamentoData, { color: textSecondary }]}>{item.data}</Text>
              </View>
            </View>
            <Text style={[styles.lancamentoValor, { color: textPrimary }]}>
              - R$ {item.valor.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
}

export default function HistoricoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bg = isDark ? '#0a1628' : '#eef4ff';
  const card = isDark ? '#111f35' : '#ffffff';
  const border = isDark ? '#1e3050' : '#dde8f5';
  const textPrimary = isDark ? '#e8f0fe' : '#0d1b2a';
  const textSecondary = isDark ? '#6b8aaa' : '#5a7a9a';

  const despesas = MOCK_HISTORICO.filter(i => i.tipo === 'despesa');
  const assinaturas = MOCK_HISTORICO.filter(i => i.tipo === 'assinatura');
  const totalDespesas = despesas.reduce((acc, i) => acc + i.valor, 0);
  const totalAssinaturas = assinaturas.reduce((acc, i) => acc + i.valor, 0);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.titulo, { color: textPrimary }]}>Histórico</Text>

        {/* Resumo */}
        <View style={[styles.cardResumo, { backgroundColor: '#1560A8' }]}>
          <Text style={styles.resumoLabel}>Total em setembro</Text>
          <Text style={styles.resumoValor}>
            R$ {(totalDespesas + totalAssinaturas).toFixed(2).replace('.', ',')}
          </Text>
          <View style={styles.resumoRow}>
            <View style={styles.resumoItem}>
              <Ionicons name="cart-outline" size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.resumoItemTexto}>
                R$ {totalDespesas.toFixed(2).replace('.', ',')} em despesas
              </Text>
            </View>
            <View style={styles.resumoItem}>
              <Ionicons name="repeat-outline" size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.resumoItemTexto}>
                R$ {totalAssinaturas.toFixed(2).replace('.', ',')} em assinaturas
              </Text>
            </View>
          </View>
        </View>

        {/* Card despesas */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <View style={styles.cardTopo}>
            <View style={styles.cardTopoEsquerda}>
              <Ionicons name="cart-outline" size={18} color="#ff6b6b" />
              <Text style={[styles.cardTitulo, { color: textPrimary }]}>Despesas</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: 'rgba(255,107,107,0.15)' }]}>
              <Text style={[styles.badgeTexto, { color: '#ff6b6b' }]}>
                R$ {totalDespesas.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
          <ListaLancamentos itens={despesas} isDark={isDark} />
        </View>

        {/* Card assinaturas */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <View style={styles.cardTopo}>
            <View style={styles.cardTopoEsquerda}>
              <Ionicons name="repeat-outline" size={18} color="#2E9EFF" />
              <Text style={[styles.cardTitulo, { color: textPrimary }]}>Assinaturas</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: 'rgba(46,158,255,0.15)' }]}>
              <Text style={[styles.badgeTexto, { color: '#2E9EFF' }]}>
                R$ {totalAssinaturas.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
          <ListaLancamentos itens={assinaturas} isDark={isDark} />
        </View>
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
  cardResumo: {
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  resumoLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  resumoValor: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  resumoRow: {
    gap: 4,
    marginTop: 4,
  },
  resumoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resumoItemTexto: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTopoEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeTexto: {
    fontSize: 13,
    fontWeight: '700',
  },
  separador: {
    height: 1,
    marginVertical: 4,
  },
  lancamentoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  emojiContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  lancamentoInfo: {
    flex: 1,
    gap: 4,
  },
  lancamentoNome: {
    fontSize: 14,
    fontWeight: '600',
  },
  lancamentoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lancamentoCategoria: {
    fontSize: 11,
  },
  ponto: {
    fontSize: 11,
  },
  lancamentoData: {
    fontSize: 11,
  },
  lancamentoValor: {
    fontSize: 14,
    fontWeight: '700',
  },
  vazio: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  vazioTexto: {
    fontSize: 13,
  },
});