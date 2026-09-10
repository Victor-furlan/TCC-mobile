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

const MOCK_USUARIO = {
  nome: 'Victor Furlan',
  email: 'victor@email.com',
  renda: 3000,
  horasTrabalhadas: 160,
  moeda: 'BRL',
  membro_desde: 'Janeiro 2026',
};

type ItemConfigProps = {
  icone: string;
  label: string;
  valor?: string;
  cor?: string;
  onPress?: () => void;
  textPrimary: string;
  textSecondary: string;
  border: string;
  isDark: boolean;
};

function ItemConfig({ icone, label, valor, cor, onPress, textPrimary, textSecondary, border, isDark }: ItemConfigProps) {
  const inputBg = isDark ? '#0d1a2e' : '#f5f9ff';
  return (
    <TouchableOpacity
      style={[styles.itemConfig, { borderBottomColor: border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.itemIcone, { backgroundColor: inputBg }]}>
        <Ionicons name={icone as any} size={18} color={cor || '#2E9EFF'} />
      </View>
      <Text style={[styles.itemLabel, { color: cor || textPrimary }]}>{label}</Text>
      <View style={styles.itemDireita}>
        {valor && <Text style={[styles.itemValor, { color: textSecondary }]}>{valor}</Text>}
        {onPress && <Ionicons name="chevron-forward" size={16} color={textSecondary} />}
      </View>
    </TouchableOpacity>
  );
}

export default function PerfilScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bg = isDark ? '#0a1628' : '#eef4ff';
  const card = isDark ? '#111f35' : '#ffffff';
  const border = isDark ? '#1e3050' : '#dde8f5';
  const inputBg = isDark ? '#0d1a2e' : '#f5f9ff';
  const textPrimary = isDark ? '#e8f0fe' : '#0d1b2a';
  const textSecondary = isDark ? '#6b8aaa' : '#5a7a9a';

  const valorHora = (MOCK_USUARIO.renda / MOCK_USUARIO.horasTrabalhadas).toFixed(2);

  const itemProps = { textPrimary, textSecondary, border, isDark };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.titulo, { color: textPrimary }]}>Perfil</Text>

        {/* Avatar e info */}
        <View style={[styles.cardPerfil, { backgroundColor: '#1560A8' }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetra}>
              {MOCK_USUARIO.nome.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.perfilInfo}>
            <Text style={styles.perfilNome}>{MOCK_USUARIO.nome}</Text>
            <Text style={styles.perfilEmail}>{MOCK_USUARIO.email}</Text>
            <Text style={styles.perfilMembro}>Membro desde {MOCK_USUARIO.membro_desde}</Text>
          </View>
        </View>

        {/* Base financeira */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Base Financeira</Text>
          <View style={styles.baseGrid}>
            <View style={[styles.baseItem, { backgroundColor: inputBg, borderColor: border }]}>
              <Ionicons name="cash-outline" size={20} color="#2E9EFF" />
              <Text style={[styles.baseLabel, { color: textSecondary }]}>Renda mensal</Text>
              <Text style={[styles.baseValor, { color: textPrimary }]}>
                R$ {MOCK_USUARIO.renda.toLocaleString('pt-BR')}
              </Text>
            </View>
            <View style={[styles.baseItem, { backgroundColor: inputBg, borderColor: border }]}>
              <Ionicons name="time-outline" size={20} color="#2E9EFF" />
              <Text style={[styles.baseLabel, { color: textSecondary }]}>Horas/mês</Text>
              <Text style={[styles.baseValor, { color: textPrimary }]}>
                {MOCK_USUARIO.horasTrabalhadas}h
              </Text>
            </View>
            <View style={[styles.baseItem, { backgroundColor: inputBg, borderColor: border, width: '100%' }]}>
              <Ionicons name="hourglass-outline" size={20} color="#f5a623" />
              <Text style={[styles.baseLabel, { color: textSecondary }]}>Valor da sua hora</Text>
              <Text style={[styles.baseValor, { color: textPrimary }]}>
                R$ {valorHora}/h
              </Text>
            </View>
          </View>
        </View>

        {/* Configurações */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Configurações</Text>
          <ItemConfig
            icone="person-outline"
            label="Editar perfil"
            onPress={() => {}}
            {...itemProps}
          />
          <ItemConfig
            icone="lock-closed-outline"
            label="Alterar senha"
            onPress={() => {}}
            {...itemProps}
          />
          <ItemConfig
            icone="cash-outline"
            label="Renda mensal"
            valor={`R$ ${MOCK_USUARIO.renda.toLocaleString('pt-BR')}`}
            onPress={() => {}}
            {...itemProps}
          />
          <ItemConfig
            icone="time-outline"
            label="Horas trabalhadas"
            valor={`${MOCK_USUARIO.horasTrabalhadas}h/mês`}
            onPress={() => {}}
            {...itemProps}
          />
          <ItemConfig
            icone="contrast-outline"
            label="Tema"
            valor={isDark ? 'Escuro' : 'Claro'}
            onPress={() => {}}
            {...itemProps}
          />
        </View>

        {/* Sobre */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Sobre</Text>
          <ItemConfig
            icone="information-circle-outline"
            label="Versão do app"
            valor="1.0.0"
            {...itemProps}
          />
          <ItemConfig
            icone="globe-outline"
            label="Acessar versão web"
            onPress={() => {}}
            {...itemProps}
          />
        </View>

        {/* Sair */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <ItemConfig
            icone="log-out-outline"
            label="Sair"
            cor="#ff6b6b"
            onPress={() => {}}
            {...itemProps}
          />
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
  cardPerfil: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetra: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  perfilInfo: {
    flex: 1,
    gap: 2,
  },
  perfilNome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  perfilEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  perfilMembro: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 4,
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  baseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  baseItem: {
    width: '47%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 6,
  },
  baseLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  baseValor: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemConfig: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  itemDireita: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemValor: {
    fontSize: 13,
  },
});