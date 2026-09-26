import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTema } from '@/contexts/temaContexto';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';
import { useUsuario } from '@/contexts/usuarioContexto';
import { useDespesas } from '@/contexts/despesasContexto';
import { useAssinaturas } from '@/contexts/assinaturasContexto';

const HUMOR_EMOJI: Record<string, string> = {
  feliz: '😊',
  ansioso: '😰',
  estressado: '😡',
  cansado: '😴',
  neutro: '😐',
};

const MESES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
];

function normalizarValorMensal(valor: number, periodicidade: string): number {
  switch (periodicidade) {
    case 'anual':   return valor / 12;
    case 'semanal': return valor * 4;
    default:        return valor;
  }
}

function formatarData(dataISO: string): string {
  const hoje = new Date();
  const ontem = new Date(hoje);
  ontem.setDate(hoje.getDate() - 1);

  // Comparar só a parte da data
  const [ano, mes, dia] = dataISO.split('-').map(Number);
  const data = new Date(ano, mes - 1, dia);

  if (
    data.getDate() === hoje.getDate() &&
    data.getMonth() === hoje.getMonth() &&
    data.getFullYear() === hoje.getFullYear()
  ) return 'Hoje';

  if (
    data.getDate() === ontem.getDate() &&
    data.getMonth() === ontem.getMonth() &&
    data.getFullYear() === ontem.getFullYear()
  ) return 'Ontem';

  const diasSemana = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  return diasSemana[data.getDay()];
}

function diasAte(dataISO: string): number {
  const hoje = new Date();
  const [ano, mes, dia] = dataISO.split('-').map(Number);
  const alvo = new Date(ano, mes - 1, dia);
  const diff = alvo.getTime() - new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()).getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function DashboardScreen() {
  const { isDark } = useTema();
  const cores = useCores();
  const { usuario, carregando: carregandoUsuario } = useUsuario();
  const { despesas, carregando: carregandoDespesas } = useDespesas();
  const { assinaturas, carregando: carregandoAssinaturas } = useAssinaturas();

  const carregando = carregandoUsuario || carregandoDespesas || carregandoAssinaturas;

  // Totais
  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);
  const totalAssinaturas = assinaturas.reduce(
    (acc, a) => acc + normalizarValorMensal(a.valor, a.periodicidade), 0
  );
  const totalGasto = totalDespesas + totalAssinaturas;
  const renda = usuario?.renda_mensal ?? 0;
  const percentual = renda > 0 ? Math.min(Math.round((totalGasto / renda) * 100), 100) : 0;

  // Próxima renovação
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const proximaAssinatura = assinaturas.find(a => {
    const [ano, mes, dia] = a.proxima_cobranca.split('-').map(Number);
    const data = new Date(ano, mes - 1, dia);
    return data >= hoje;
  }) ?? null;
  const diasProxima = proximaAssinatura ? diasAte(proximaAssinatura.proxima_cobranca) : null;

  // Últimos 3 lançamentos
  const ultimos = despesas.slice(0, 3);

  // Mês atual
  const agora = new Date();
  const mesAtual = `${MESES[agora.getMonth()]} ${agora.getFullYear()}`;

  if (carregando) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: cores.bg }]}>
        <ActivityIndicator style={{ flex: 1 }} color={CoresFixas.azulClaro} />
      </SafeAreaView>
    );
  }

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
            <Text style={[styles.nome, { color: cores.textPrimario }]}>
              {usuario?.nome ?? '—'}
            </Text>
          </View>
          <View style={[styles.mesTag, { backgroundColor: cores.card, borderColor: cores.border }]}>
            <Text style={[styles.mesTexto, { color: cores.textSecundario }]}>{mesAtual}</Text>
          </View>
        </View>

        {/* Card principal */}
        <View style={[styles.cardPrincipal, { backgroundColor: cores.authHeaderBg }]}>
          <Text style={styles.cardPrincipalLabel}>Total gasto no mês</Text>
          <Text style={styles.cardPrincipalValor}>
            R$ {totalGasto.toFixed(2).replace('.', ',')}
          </Text>
          <View style={styles.barraContainer}>
            <View style={[styles.barra, { width: `${percentual}%` }]} />
          </View>
          <Text style={styles.cardPrincipalSub}>
            {percentual}% da sua renda mensal comprometida
          </Text>
        </View>

        {/* Cards secundários */}
        <View style={styles.linha}>
          <View style={[styles.cardSecundario, { backgroundColor: cores.inputBg, borderColor: cores.border }]}>
            <Ionicons name="repeat-outline" size={20} color={CoresFixas.azulClaro} />
            <Text style={[styles.cardSecLabel, { color: cores.textSecundario }]}>Assinaturas</Text>
            <Text style={[styles.cardSecValor, { color: cores.textPrimario }]}>
              R$ {totalAssinaturas.toFixed(2).replace('.', ',')}
            </Text>
          </View>
          <View style={[styles.cardSecundario, { backgroundColor: cores.inputBg, borderColor: cores.border }]}>
            <Ionicons name="cart-outline" size={20} color={CoresFixas.azulClaro} />
            <Text style={[styles.cardSecLabel, { color: cores.textSecundario }]}>Despesas</Text>
            <Text style={[styles.cardSecValor, { color: cores.textPrimario }]}>
              R$ {totalDespesas.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        {/* Próxima renovação */}
        {proximaAssinatura && (
          <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
            <View style={styles.cardTopo}>
              <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Próxima renovação</Text>
              <Ionicons name="time-outline" size={18} color={cores.textSecundario} />
            </View>
            <View style={styles.renovacaoRow}>
              <Text style={[styles.renovacaoNome, { color: cores.textPrimario }]}>
                {proximaAssinatura.nome}
              </Text>
              <Text style={[styles.renovacaoDias, { color: CoresFixas.azulClaro }]}>
                {diasProxima === 0
                  ? 'hoje'
                  : diasProxima === 1
                  ? 'amanhã'
                  : `em ${diasProxima} dias`}
              </Text>
              <Text style={[styles.renovacaoValor, { color: cores.textSecundario }]}>
                R$ {proximaAssinatura.valor.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
        )}

        {/* Últimos lançamentos */}
        {ultimos.length > 0 && (
          <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
            <View style={styles.cardTopo}>
              <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Últimos lançamentos</Text>
            </View>
            {ultimos.map(item => (
              <View key={item.id} style={[styles.lancamentoRow, { borderTopColor: cores.border }]}>
                <Text style={styles.lancamentoEmoji}>
                  {HUMOR_EMOJI[item.humor] ?? '💸'}
                </Text>
                <View style={styles.lancamentoInfo}>
                  <Text style={[styles.lancamentoNome, { color: cores.textPrimario }]}>{item.nome}</Text>
                  <Text style={[styles.lancamentoData, { color: cores.textSecundario }]}>
                    {formatarData(item.data)}
                  </Text>
                </View>
                <Text style={[styles.lancamentoValor, { color: cores.textPrimario }]}>
                  - R$ {item.valor.toFixed(2).replace('.', ',')}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, gap: 16, paddingBottom: 32 },
  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saudacao: { fontSize: 13 },
  nome: { fontSize: 22, fontWeight: "700" },
  mesTag: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  mesTexto: { fontSize: 12, fontWeight: "500" },
  cardPrincipal: {
    borderRadius: 24,
    padding: 20,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardPrincipalLabel: { color: CoresFixas.cardPrincipalLabel, fontSize: 13 },
  cardPrincipalValor: {
    color: CoresFixas.branco,
    fontSize: 32,
    fontWeight: "800",
  },
  barraContainer: {
    height: 6,
    backgroundColor: CoresFixas.barraFundo,
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 4,
  },
  barra: {
    height: "100%",
    backgroundColor: CoresFixas.branco,
    borderRadius: 3,
  },
  cardPrincipalSub: { color: CoresFixas.cardPrincipalLabel, fontSize: 12 },
  linha: { flexDirection: "row", gap: 12 },
  cardSecundario: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  cardSecLabel: { fontSize: 12 },
  cardSecValor: { fontSize: 18, fontWeight: "700" },
  card: { borderRadius: 20, borderWidth: 1, padding: 16, gap: 12 },
  cardTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitulo: { fontSize: 15, fontWeight: "700" },
  renovacaoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  renovacaoNome: { fontSize: 15, fontWeight: "600", flex: 1 },
  renovacaoDias: { fontSize: 12, fontWeight: "600" },
  renovacaoValor: { fontSize: 13 },
  lancamentoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderTopWidth: 1,
    paddingTop: 12,
  },
  lancamentoEmoji: { fontSize: 24 },
  lancamentoInfo: { flex: 1, gap: 2 },
  lancamentoNome: { fontSize: 14, fontWeight: "600" },
  lancamentoData: { fontSize: 12 },
  lancamentoValor: { fontSize: 14, fontWeight: "700" },
});