import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '@/contexts/temaContexto';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';

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
  const { isDark } = useTema();
  const cores = useCores();

  const percentual = Math.round((MOCK.totalGasto / MOCK.renda) * 100);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.bg} />
      <ScrollView
        style={{ backgroundColor: cores.bg }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Topo */}
        <View style={styles.topo}>
          <View>
            <Text style={[styles.saudacao, { color: cores.textSecundario }]}>Olá,</Text>
            <Text style={[styles.nome, { color: cores.textPrimario }]}>{MOCK.nome} 👋</Text>
          </View>
          <View style={[styles.mesTag, { backgroundColor: cores.card, borderColor: cores.border }]}>
            <Text style={[styles.mesTexto, { color: cores.textSecundario }]}>Setembro 2026</Text>
          </View>
        </View>

        {/* Card principal */}
        <View style={[styles.cardPrincipal, { backgroundColor: cores.authHeaderBg }]}>
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

        {/* Cards secundários — inputBg cria contraste com o bg */}
        <View style={styles.linha}>
          <View style={[styles.cardSecundario, { backgroundColor: cores.inputBg, borderColor: cores.border }]}>
            <Ionicons name="repeat-outline" size={20} color={CoresFixas.azulClaro} />
            <Text style={[styles.cardSecLabel, { color: cores.textSecundario }]}>Assinaturas</Text>
            <Text style={[styles.cardSecValor, { color: cores.textPrimario }]}>
              R$ {MOCK.totalAssinaturas.toFixed(2).replace('.', ',')}
            </Text>
          </View>
          <View style={[styles.cardSecundario, { backgroundColor: cores.inputBg, borderColor: cores.border }]}>
            <Ionicons name="cart-outline" size={20} color={CoresFixas.azulClaro} />
            <Text style={[styles.cardSecLabel, { color: cores.textSecundario }]}>Despesas</Text>
            <Text style={[styles.cardSecValor, { color: cores.textPrimario }]}>
              R$ {MOCK.totalDespesas.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        {/* Próxima renovação */}
        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <View style={styles.cardTopo}>
            <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Próxima renovação</Text>
            <Ionicons name="time-outline" size={18} color={cores.textSecundario} />
          </View>
          <View style={styles.renovacaoRow}>
            <Text style={[styles.renovacaoNome, { color: cores.textPrimario }]}>
              {MOCK.proximaRenovacao.nome}
            </Text>
            <Text style={[styles.renovacaoDias, { color: CoresFixas.azulClaro }]}>
              em {MOCK.proximaRenovacao.dias} dias
            </Text>
            <Text style={[styles.renovacaoValor, { color: cores.textSecundario }]}>
              R$ {MOCK.proximaRenovacao.valor.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        {/* Últimos lançamentos */}
        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <View style={styles.cardTopo}>
            <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Últimos lançamentos</Text>
          </View>
          {MOCK.ultimosLancamentos.map(item => (
            <View key={item.id} style={[styles.lancamentoRow, { borderTopColor: cores.border }]}>
              <Text style={styles.lancamentoEmoji}>{item.emoji}</Text>
              <View style={styles.lancamentoInfo}>
                <Text style={[styles.lancamentoNome, { color: cores.textPrimario }]}>{item.descricao}</Text>
                <Text style={[styles.lancamentoData, { color: cores.textSecundario }]}>{item.data}</Text>
              </View>
              <Text style={[styles.lancamentoValor, { color: cores.textPrimario }]}>
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
    borderRadius: 24,
    padding: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardPrincipalLabel: {
    color: CoresFixas.cardPrincipalLabel,
    fontSize: 13,
  },
  cardPrincipalValor: {
    color: CoresFixas.branco,
    fontSize: 32,
    fontWeight: '800',
  },
  barraContainer: {
    height: 6,
    backgroundColor: CoresFixas.barraFundo,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 4,
  },
  barra: {
    height: '100%',
    backgroundColor: CoresFixas.branco,
    borderRadius: 3,
  },
  cardPrincipalSub: {
    color: CoresFixas.cardPrincipalLabel,
    fontSize: 12,
  },
  linha: {
    flexDirection: 'row',
    gap: 12,
  },
  cardSecundario: {
    flex: 1,
    borderRadius: 20,
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
    borderRadius: 20,
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