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

const INTEGRANTES = [
  { nome: 'Victor Furlan', foto: require('@/assets/images/victor.jpeg') },
  { nome: 'Pérola Evellyn', foto: require('@/assets/images/perola.jpeg') },
  { nome: 'Klayton Mendes', foto: require('@/assets/images/klayton.jpeg') },
];

export default function SobreScreen() {
  const router = useRouter();
  const { isDark } = useTema();

  const bg = isDark ? '#0a1628' : '#eef4ff';
  const card = isDark ? '#111f35' : '#ffffff';
  const border = isDark ? '#1e3050' : '#dde8f5';
  const inputBg = isDark ? '#0d1a2e' : '#f5f9ff';
  const textPrimary = isDark ? '#e8f0fe' : '#0d1b2a';
  const textSecondary = isDark ? '#6b8aaa' : '#5a7a9a';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com botão voltar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.botaoVoltar}>
            <Ionicons name="arrow-back" size={22} color={textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.titulo, { color: textPrimary }]}>Sobre</Text>
        </View>

        {/* Logo */}
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

        {/* Descrição */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Sobre o projeto</Text>
          <Text style={[styles.descricao, { color: textSecondary }]}>
            MindCash é um aplicativo de controle financeiro pessoal que integra análise emocional e a percepção do dinheiro como tempo de vida, desenvolvido como Trabalho de Conclusão de Curso (TCC) do Técnico em Desenvolvimento de Sistemas da Etec de Hortolândia.
          </Text>
        </View>

        {/* Funcionalidades */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Funcionalidades</Text>
          {[
            { icone: 'cart-outline', texto: 'Registro de gastos variáveis com contexto emocional' },
            { icone: 'repeat-outline', texto: 'Controle de gastos recorrentes e assinaturas' },
            { icone: 'hourglass-outline', texto: 'Conversão de gastos em horas de vida trabalhada' },
            { icone: 'happy-outline', texto: 'Análise do humor no momento do gasto' },
            { icone: 'star-outline', texto: 'Nível de arrependimento pós-gasto' },
            { icone: 'bar-chart-outline', texto: 'Dashboard com visão geral financeira' },
          ].map((item, index) => (
            <View key={index} style={[styles.funcionalidadeItem, { borderTopColor: border }]}>
              <View style={[styles.funcionalidadeIcone, { backgroundColor: inputBg }]}>
                <Ionicons name={item.icone as any} size={18} color="#2E9EFF" />
              </View>
              <Text style={[styles.funcionalidadeTexto, { color: textSecondary }]}>{item.texto}</Text>
            </View>
          ))}
        </View>

        {/* Integrantes */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Equipe</Text>
          <View style={styles.integrantesRow}>
            {INTEGRANTES.map(integrante => (
              <View key={integrante.nome} style={styles.integranteItem}>
                <Image
                  source={integrante.foto}
                  style={styles.integranteFoto}
                />
                <Text style={[styles.integranteNome, { color: textPrimary }]}>
                  {integrante.nome.split(' ')[0]}
                </Text>
                <Text style={[styles.integranteSobrenome, { color: textSecondary }]}>
                  {integrante.nome.split(' ')[1]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Versão */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          {[
            { label: 'Versão', valor: '1.0.0' },
            { label: 'Instituição', valor: 'Etec Hortolândia' },
            { label: 'Curso', valor: 'Técnico em DS' },
          ].map((item, index) => (
            <View key={index} style={[styles.versaoRow, index > 0 && { borderTopWidth: 1, borderTopColor: border }]}>
              <Text style={[styles.versaoLabel, { color: textSecondary }]}>{item.label}</Text>
              <Text style={[styles.versaoValor, { color: textPrimary }]}>{item.valor}</Text>
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
  botaoVoltar: {
    padding: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
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
    fontWeight: '700',
  },
  descricao: {
    fontSize: 14,
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
    fontWeight: '700',
  },
  integranteSobrenome: {
    fontSize: 11,
  },
  versaoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  versaoLabel: {
    fontSize: 13,
  },
  versaoValor: {
    fontSize: 13,
    fontWeight: '600',
  },
});