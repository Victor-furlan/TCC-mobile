import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MOCK = {
  nome: 'Victor',
  renda: 3000,
  totalGasto: 1240.5,
  totalAssinaturas: 387.9,
  totalDespesas: 852.6,
  proximaRenovacao: { nome: 'Netflix', dias: 3, valor: 55.9 },
  ultimosLancamentos: [
    { id: '1', descricao: 'iFood', valor: 45.9, tipo: 'despesa', emoji: '😰', data: 'Hoje' },
    { id: '2', descricao: 'Spotify', valor: 21.9, tipo: 'assinatura', emoji: '😐', data: 'Ontem' },
    { id: '3', descricao: 'Mercado', valor: 187.5, tipo: 'despesa', emoji: '😊', data: 'Seg' },
  ],
};

export default function DashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bg = isDark ? '#0a1628' : '#eef4ff';
  const card = isDark ? '#111f35' : '#ffffff';
  const border = isDark ? '#1e3050' : '#dde8f5';
  const textPrimary = isDark ? '#e8f0fe' : '#0d1b2a';
  const textSecondary = isDark ? '#6b8aaa' : '#5a7a9a';

  const percentual = Math.round((MOCK.totalGasto / MOCK.renda) * 100);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={bg}
      />
      <ScrollView
        style={{ backgroundColor: bg }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.topo}>
          <View>
            <Text style={[styles.saudacao, { color: textSecondary }]}>Olá,</Text>
            <Text style={[styles.nome, { color: textPrimary }]}>{MOCK.nome} 👋</Text>
          </View>
          <View style={[styles.mesTag, { backgroundColor: card, borderColor: border }]}>
            <Text style={[styles.mesTexto, { color: textSecondary }]}>Setembro 2026</Text>
          </View>
        </View>

        <View style={[styles.cardPrincipal, { backgroundColor: '#1560A8' }]}>
          <Text style={styles.cardPrincipalLabel}>Total gasto no mês</Text>
          <Text style={styles.cardPrincipalValor}>
            R$ {MOCK.totalGasto.toFixed(2).replace('.', ',')}
          </Text>
          <View style={styles.barraContainer}>
            <View style={[styles.barra, { width: `${Math.min(percentual, 100)}%` }]} />
          </View>
          <Text style={styles.cardPrincipalSub}>
            {percentual}% da sua renda mensal comprometida
          </Text>
        </View>

        <View style={styles.linha}>
          <View style={[styles.cardSecundario, { backgroundColor: card, borderColor: border }]}>
            <Ionicons name="repeat-outline" size={20} color="#2E9EFF" />
            <Text style={[styles.cardSecLabel, { color: textSecondary }]}>Assinaturas</Text>
            <Text style={[styles.cardSecValor, { color: textPrimary }]}>
              R$ {MOCK.totalAssinaturas.toFixed(2).replace('.', ',')}
            </Text>
          </View>
          <View style={[styles.cardSecundario, { backgroundColor: card, borderColor: border }]}>
            <Ionicons name="cart-outline" size={20} color="#2E9EFF" />
            <Text style={[styles.cardSecLabel, { color: textSecondary }]}>Despesas</Text>
            <Text style={[styles.cardSecValor, { color: textPrimary }]}>
              R$ {MOCK.totalDespesas.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <View style={styles.cardTopo}>
            <Text style={[styles.cardTitulo, { color: textPrimary }]}>Próxima renovação</Text>
            <Ionicons name="time-outline" size={18} color={textSecondary} />
          </View>
          <View style={styles.renovacaoRow}>
            <Text style={[styles.renovacaoNome, { color: textPrimary }]}>
              {MOCK.proximaRenovacao.nome}
            </Text>
            <Text style={[styles.renovacaoDias, { color: '#2E9EFF' }]}>
              em {MOCK.proximaRenovacao.dias} dias
            </Text>
            <Text style={[styles.renovacaoValor, { color: textSecondary }]}>
              R$ {MOCK.proximaRenovacao.valor.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <View style={styles.cardTopo}>
            <Text style={[styles.cardTitulo, { color: textPrimary }]}>Últimos lançamentos</Text>
          </View>
          {MOCK.ultimosLancamentos.map(item => (
            <View key={item.id} style={[styles.lancamentoRow, { borderTopColor: border }]}>
              <Text style={styles.lancamentoEmoji}>{item.emoji}</Text>
              <View style={styles.lancamentoInfo}>
                <Text style={[styles.lancamentoNome, { color: textPrimary }]}>{item.descricao}</Text>
                <Text style={[styles.lancamentoData, { color: textSecondary }]}>{item.data}</Text>
              </View>
              <Text style={[styles.lancamentoValor, { color: textPrimary }]}>
                - R$ {item.valor.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
    paddingVertical: 4,
  },
  botaoSairTexto: {
    fontSize: 13,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saudacao: {
    fontSize: 13,
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
  },
  mesTag: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  mesTexto: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardPrincipal: {
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  cardPrincipalLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  cardPrincipalValor: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  barraContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 4,
  },
  barra: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  cardPrincipalSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  linha: {
    flexDirection: 'row',
    gap: 12,
  },
  cardSecundario: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  cardSecLabel: {
    fontSize: 12,
  },
  cardSecValor: {
    fontSize: 18,
    fontWeight: '700',
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
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
  },
  renovacaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  renovacaoNome: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  renovacaoDias: {
    fontSize: 12,
    fontWeight: '600',
  },
  renovacaoValor: {
    fontSize: 13,
  },
  lancamentoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    paddingTop: 12,
  },
  lancamentoEmoji: {
    fontSize: 24,
  },
  lancamentoInfo: {
    flex: 1,
    gap: 2,
  },
  lancamentoNome: {
    fontSize: 14,
    fontWeight: '600',
  },
  lancamentoData: {
    fontSize: 12,
  },
  lancamentoValor: {
    fontSize: 14,
    fontWeight: '700',
  },
});