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
import type { Temacores } from '@/constants/cores';
import { Fontes } from '@/constants/fontes';

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

function ListaLancamentos({ itens, cores }: { itens: typeof MOCK_HISTORICO; cores: Temacores }) {
  if (itens.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={[styles.vazioTexto, { color: cores.textSecundario }]}>Nenhum registro ainda</Text>
      </View>
    );
  }

  return (
    <>
      {itens.map((item, index) => (
        <View key={item.id}>
          {index > 0 && <View style={[styles.separador, { backgroundColor: cores.border }]} />}
          <View style={styles.lancamentoRow}>
            <View style={[styles.emojiContainer, { backgroundColor: cores.inputBg }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.lancamentoInfo}>
              <Text style={[styles.lancamentoNome, { color: cores.textPrimario }]}>{item.descricao}</Text>
              <View style={styles.lancamentoMeta}>
                <Text style={[styles.lancamentoCategoria, { color: cores.textSecundario }]}>{item.categoria}</Text>
                <Text style={[styles.ponto, { color: cores.textSecundario }]}>·</Text>
                <Text style={[styles.lancamentoData, { color: cores.textSecundario }]}>{item.data}</Text>
              </View>
            </View>
            <Text style={[styles.lancamentoValor, { color: cores.textPrimario }]}>
              - R$ {item.valor.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
}

export default function HistoricoScreen() {
  const { isDark } = useTema();
  const cores = useCores();

  const despesas = MOCK_HISTORICO.filter(i => i.tipo === 'despesa');
  const assinaturas = MOCK_HISTORICO.filter(i => i.tipo === 'assinatura');
  const totalDespesas = despesas.reduce((acc, i) => acc + i.valor, 0);
  const totalAssinaturas = assinaturas.reduce((acc, i) => acc + i.valor, 0);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.titulo, { color: cores.textPrimario }]}>Histórico</Text>

        <View style={[styles.cardResumo, { backgroundColor: cores.authHeaderBg }]}>
          <Text style={styles.resumoLabel}>Total em setembro</Text>
          <Text style={styles.resumoValor}>
            R$ {(totalDespesas + totalAssinaturas).toFixed(2).replace('.', ',')}
          </Text>
          <View style={styles.resumoRow}>
            <View style={styles.resumoItem}>
              <Ionicons name="cart-outline" size={14} color={CoresFixas.cardPrincipalLabel} />
              <Text style={styles.resumoItemTexto}>
                R$ {totalDespesas.toFixed(2).replace('.', ',')} em despesas
              </Text>
            </View>
            <View style={styles.resumoItem}>
              <Ionicons name="repeat-outline" size={14} color={CoresFixas.cardPrincipalLabel} />
              <Text style={styles.resumoItemTexto}>
                R$ {totalAssinaturas.toFixed(2).replace('.', ',')} em assinaturas
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <View style={styles.cardTopo}>
            <View style={styles.cardTopoEsquerda}>
              <Ionicons name="cart-outline" size={18} color={CoresFixas.erro} />
              <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Despesas</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: 'rgba(255,107,107,0.15)' }]}>
              <Text style={[styles.badgeTexto, { color: CoresFixas.erro }]}>
                R$ {totalDespesas.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
          <ListaLancamentos itens={despesas} cores={cores} />
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <View style={styles.cardTopo}>
            <View style={styles.cardTopoEsquerda}>
              <Ionicons name="repeat-outline" size={18} color={CoresFixas.azulClaro} />
              <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Assinaturas</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: 'rgba(46,158,255,0.15)' }]}>
              <Text style={[styles.badgeTexto, { color: CoresFixas.azulClaro }]}>
                R$ {totalAssinaturas.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
          <ListaLancamentos itens={assinaturas} cores={cores} />
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
    fontFamily: Fontes.bold,
  },
  cardResumo: {
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  resumoLabel: {
    color: CoresFixas.cardPrincipalLabel,
    fontSize: 13,
    fontFamily: Fontes.regular,
  },
  resumoValor: {
    color: CoresFixas.branco,
    fontSize: 32,
    fontFamily: Fontes.bold,
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
    color: CoresFixas.cardPrincipalLabel,
    fontSize: 12,
    fontFamily: Fontes.regular,
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
    fontFamily: Fontes.bold,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeTexto: {
    fontSize: 13,
    fontFamily: Fontes.bold,
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
  emoji: { fontSize: 22 },
  lancamentoInfo: {
    flex: 1,
    gap: 4,
  },
  lancamentoNome: {
    fontSize: 14,
    fontFamily: Fontes.semiBold,
  },
  lancamentoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lancamentoCategoria: {
    fontSize: 11,
    fontFamily: Fontes.regular,
  },
  ponto: {
    fontSize: 11,
    fontFamily: Fontes.regular,
  },
  lancamentoData: {
    fontSize: 11,
    fontFamily: Fontes.regular,
  },
  lancamentoValor: {
    fontSize: 14,
    fontFamily: Fontes.bold,
  },
  vazio: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  vazioTexto: {
    fontSize: 13,
    fontFamily: Fontes.regular,
  },
});