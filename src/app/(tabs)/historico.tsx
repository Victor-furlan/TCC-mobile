import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTema } from '@/contexts/temaContexto';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';
import type { Temacores } from '@/constants/cores';
import { Fontes } from '@/constants/fontes';
import { useDespesas } from '@/contexts/despesasContexto';
import { useAssinaturas } from '@/contexts/assinaturasContexto';

const HUMOR_EMOJI: Record<string, string> = {
  feliz: '😊',
  ansioso: '😰',
  estressado: '😡',
  cansado: '😴',
  neutro: '😐',
};

type ItemLista = {
  id: string,
  descricao: string,
  valor: number,
  categoria: string,
  humor: string,
  emoji: string,
  data: string,
};

function ListaLancamentos({ itens, cores }: { itens: ItemLista[]; cores: Temacores }) {
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
  const {assinaturas} = useAssinaturas();
  const {despesas} = useDespesas();

  const itensDespesas: ItemLista[] = despesas.map(d => ({
    id: d.id,
    descricao: d.nome,
    valor: Number(d.valor),
    categoria: d.categoria,
    humor: d.humor,
    emoji: HUMOR_EMOJI[d.humor] ?? '😐',
    data: new Date(d.data + 'T00:00:00').toLocaleDateString('pt-BR'),
  }));

  const itensAssinaturas: ItemLista[] = assinaturas.map(a => ({
    id: a.id,
    descricao: a.nome,
    valor: Number(a.valor),
    categoria: a.categoria,
    humor: a.humor,
    emoji: HUMOR_EMOJI[a.humor] ?? '😐',
    data: new Date(a.proxima_cobranca + 'T00:00:00').toLocaleDateString('pt-BR'),
  }));

  const totalDespesas = itensDespesas.reduce((acc, i) => acc + i.valor, 0);
  const totalAssinaturas = itensAssinaturas.reduce((acc, i) => acc + i.valor, 0);

  const mesAtual = new Date().toLocaleDateString('pt-BR', {month: 'long', year: 'numeric'});
 
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.titulo, { color: cores.textPrimario }]}>Histórico</Text>

        <View style={[styles.cardResumo, { backgroundColor: cores.authHeaderBg }]}>
          <Text style={styles.resumoLabel}>Total em {mesAtual}</Text>
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
          <ListaLancamentos itens={itensDespesas} cores={cores} />
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
          <ListaLancamentos itens={itensAssinaturas} cores={cores} />
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