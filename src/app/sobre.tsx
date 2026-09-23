import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '@/contexts/temaContexto';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';
import { Fontes } from '@/constants/fontes';

const INTEGRANTES = [
  { nome: 'Victor Furlan', foto: require('@/assets/images/victor.jpeg') },
  { nome: 'Pérola Evellyn', foto: require('@/assets/images/perola.jpeg') },
  { nome: 'Klayton Mendes', foto: require('@/assets/images/klayton.jpeg') },
];

const FUNCIONALIDADES = [
  { icone: 'cart-outline', texto: 'Registro de gastos variáveis com contexto emocional' },
  { icone: 'repeat-outline', texto: 'Controle de gastos recorrentes e assinaturas' },
  { icone: 'hourglass-outline', texto: 'Conversão de gastos em horas de vida trabalhada' },
  { icone: 'happy-outline', texto: 'Análise do humor no momento do gasto' },
  { icone: 'star-outline', texto: 'Nível de arrependimento pós-gasto' },
  { icone: 'bar-chart-outline', texto: 'Dashboard com visão geral financeira' },
];

const INFO_VERSAO = [
  { label: 'Versão', valor: '1.0.0' },
  { label: 'Instituição', valor: 'Etec Hortolândia' },
  { label: 'Curso', valor: 'Técnico em DS' },
];

export default function SobreScreen() {
  const router = useRouter();
  const { isDark } = useTema();
  const cores = useCores();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.botaoVoltar}>
            <Ionicons name="arrow-back" size={22} color={cores.textPrimario} />
          </TouchableOpacity>
          <Text style={[styles.titulo, { color: cores.textPrimario }]}>Sobre</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={
              isDark
                ? require('@/assets/images/logo_completa_mindcash_escura.png')
                : require('@/assets/images/logo_completa_mindcash_clara.png')
            }
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Sobre o projeto</Text>
          <Text style={[styles.descricao, { color: cores.textSecundario }]}>
            MindCash é um aplicativo de controle financeiro pessoal que integra análise emocional e a percepção do dinheiro como tempo de vida, desenvolvido como Trabalho de Conclusão de Curso (TCC) do Técnico em Desenvolvimento de Sistemas da Etec de Hortolândia.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Funcionalidades</Text>
          {FUNCIONALIDADES.map((item, index) => (
            <View key={index} style={[styles.funcionalidadeItem, { borderTopColor: cores.border }]}>
              <View style={[styles.funcionalidadeIcone, { backgroundColor: cores.inputBg }]}>
                <Ionicons name={item.icone as any} size={18} color={CoresFixas.azulClaro} />
              </View>
              <Text style={[styles.funcionalidadeTexto, { color: cores.textSecundario }]}>{item.texto}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Equipe</Text>
          <View style={styles.integrantesRow}>
            {INTEGRANTES.map(integrante => (
              <View key={integrante.nome} style={styles.integranteItem}>
                <Image source={integrante.foto} style={styles.integranteFoto} />
                <Text style={[styles.integranteNome, { color: cores.textPrimario }]}>
                  {integrante.nome.split(' ')[0]}
                </Text>
                <Text style={[styles.integranteSobrenome, { color: cores.textSecundario }]}>
                  {integrante.nome.split(' ')[1]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          {INFO_VERSAO.map((item, index) => (
            <View
              key={index}
              style={[styles.versaoRow, index > 0 && { borderTopWidth: 1, borderTopColor: cores.border }]}
            >
              <Text style={[styles.versaoLabel, { color: cores.textSecundario }]}>{item.label}</Text>
              <Text style={[styles.versaoValor, { color: cores.textPrimario }]}>{item.valor}</Text>
            </View>
          ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botaoVoltar: { padding: 4 },
  titulo: {
    fontSize: 24,
    fontFamily: Fontes.bold,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  logo: {
    width: 200,
    height: 64,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  cardTitulo: {
    fontSize: 15,
    fontFamily: Fontes.bold,
  },
  descricao: {
    fontSize: 14,
    fontFamily: Fontes.regular,
    lineHeight: 22,
  },
  funcionalidadeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    paddingTop: 12,
  },
  funcionalidadeIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  funcionalidadeTexto: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fontes.regular,
    lineHeight: 18,
  },
  integrantesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  integranteItem: {
    alignItems: 'center',
    gap: 6,
  },
  integranteFoto: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  integranteNome: {
    fontSize: 13,
    fontFamily: Fontes.bold,
  },
  integranteSobrenome: {
    fontSize: 11,
    fontFamily: Fontes.regular,
  },
  versaoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  versaoLabel: {
    fontSize: 13,
    fontFamily: Fontes.regular,
  },
  versaoValor: {
    fontSize: 13,
    fontFamily: Fontes.semiBold,
  },
});