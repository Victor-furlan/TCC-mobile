import { useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useTema } from '@/contexts/temaContexto';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';

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
  textPrimario: string;
  textSecundario: string;
  border: string;
  inputBg: string;
};

function ItemConfig({ icone, label, valor, cor, onPress, textPrimario, textSecundario, border, inputBg }: ItemConfigProps) {
  return (
    <TouchableOpacity
      style={[styles.itemConfig, { borderBottomColor: border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.itemIcone, { backgroundColor: inputBg }]}>
        <Ionicons name={icone as any} size={18} color={cor || CoresFixas.azulClaro} />
      </View>
      <Text style={[styles.itemLabel, { color: cor || textPrimario }]}>{label}</Text>
      <View style={styles.itemDireita}>
        {valor && <Text style={[styles.itemValor, { color: textSecundario }]}>{valor}</Text>}
        {onPress && <Ionicons name="chevron-forward" size={16} color={textSecundario} />}
      </View>
    </TouchableOpacity>
  );
}

export default function PerfilScreen() {
  const router = useRouter();
  const { isDark, tema, setTema } = useTema();
  const cores = useCores();

  const bottomSheetTemaRef = useRef<BottomSheet>(null);
  const bottomSheetRendaRef = useRef<BottomSheet>(null);
  const bottomSheetHorasRef = useRef<BottomSheet>(null);

  const [renda, setRenda] = useState(MOCK_USUARIO.renda.toString());
  const [rendaTemp, setRendaTemp] = useState('');
  const [horas, setHoras] = useState(MOCK_USUARIO.horasTrabalhadas.toString());
  const [horasTemp, setHorasTemp] = useState('');

  const valorHora = (Number(renda) / Number(horas)).toFixed(2);

  const itemProps = {
    textPrimario: cores.textPrimario,
    textSecundario: cores.textSecundario,
    border: cores.border,
    inputBg: cores.inputBg,
  };

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.titulo, { color: cores.textPrimario }]}>Perfil</Text>

        <View style={[styles.cardPerfil, { backgroundColor: CoresFixas.azul }]}>
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

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Base Financeira</Text>
          <View style={styles.baseGrid}>
            <View style={[styles.baseItem, { backgroundColor: cores.inputBg, borderColor: cores.border }]}>
              <Ionicons name="cash-outline" size={20} color={CoresFixas.azulClaro} />
              <Text style={[styles.baseLabel, { color: cores.textSecundario }]}>Renda mensal</Text>
              <Text style={[styles.baseValor, { color: cores.textPrimario }]}>
                R$ {Number(renda).toLocaleString('pt-BR')}
              </Text>
            </View>
            <View style={[styles.baseItem, { backgroundColor: cores.inputBg, borderColor: cores.border }]}>
              <Ionicons name="time-outline" size={20} color={CoresFixas.azulClaro} />
              <Text style={[styles.baseLabel, { color: cores.textSecundario }]}>Horas/mês</Text>
              <Text style={[styles.baseValor, { color: cores.textPrimario }]}>{horas}h</Text>
            </View>
            <View style={[styles.baseItem, { backgroundColor: cores.inputBg, borderColor: cores.border, width: '100%' }]}>
              <Ionicons name="hourglass-outline" size={20} color="#f5a623" />
              <Text style={[styles.baseLabel, { color: cores.textSecundario }]}>Valor da sua hora</Text>
              <Text style={[styles.baseValor, { color: cores.textPrimario }]}>R$ {valorHora}/h</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Configurações</Text>
          <ItemConfig icone="person-outline" label="Editar perfil" onPress={() => router.push('/editar_perfil')} {...itemProps} />
          <ItemConfig icone="lock-closed-outline" label="Alterar senha" onPress={() => router.push('/alterar_senha')} {...itemProps} />
          <ItemConfig
            icone="cash-outline"
            label="Renda mensal"
            valor={`R$ ${Number(renda).toLocaleString('pt-BR')}`}
            onPress={() => { setRendaTemp(renda); bottomSheetRendaRef.current?.expand(); }}
            {...itemProps}
          />
          <ItemConfig
            icone="time-outline"
            label="Horas trabalhadas"
            valor={`${horas}h/mês`}
            onPress={() => { setHorasTemp(horas); bottomSheetHorasRef.current?.expand(); }}
            {...itemProps}
          />
          <ItemConfig
            icone="contrast-outline"
            label="Tema"
            valor={tema === 'claro' ? 'Claro' : tema === 'escuro' ? 'Escuro' : 'Sistema'}
            onPress={() => bottomSheetTemaRef.current?.expand()}
            {...itemProps}
          />
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Sobre</Text>
          <ItemConfig icone="information-circle-outline" label="Sobre o MindCash" onPress={() => router.push('/sobre')} {...itemProps} />
          <ItemConfig icone="document-text-outline" label="Versão do app" valor="1.0.0" {...itemProps} />
          <ItemConfig icone="globe-outline" label="Acessar versão web" onPress={() => {}} {...itemProps} />
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <ItemConfig icone="log-out-outline" label="Sair" cor={CoresFixas.erro} onPress={() => {}} {...itemProps} />
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetTemaRef}
        index={-1}
        snapPoints={['35%']}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: cores.card }}
        handleIndicatorStyle={{ backgroundColor: cores.border }}
      >
        <BottomSheetView style={[styles.sheetContent, { backgroundColor: cores.card }]}>
          <Text style={[styles.sheetTitulo, { color: cores.textPrimario }]}>Tema</Text>
          {[
            { id: 'claro', label: 'Claro', icone: 'sunny-outline' },
            { id: 'escuro', label: 'Escuro', icone: 'moon-outline' },
            { id: 'sistema', label: 'Sistema', icone: 'phone-portrait-outline' },
          ].map(opcao => (
            <TouchableOpacity
              key={opcao.id}
              style={[
                styles.sheetOpcao,
                { borderColor: cores.border },
                tema === opcao.id && { borderColor: CoresFixas.azulClaro, backgroundColor: 'rgba(46,158,255,0.08)' },
              ]}
              onPress={() => { setTema(opcao.id as any); bottomSheetTemaRef.current?.close(); }}
              activeOpacity={0.8}
            >
              <Ionicons
                name={opcao.icone as any}
                size={20}
                color={tema === opcao.id ? CoresFixas.azulClaro : cores.textSecundario}
              />
              <Text style={[styles.sheetOpcaoTexto, { color: tema === opcao.id ? CoresFixas.azulClaro : cores.textPrimario }]}>
                {opcao.label}
              </Text>
              {tema === opcao.id && (
                <Ionicons name="checkmark-circle" size={20} color={CoresFixas.azulClaro} style={{ marginLeft: 'auto' }} />
              )}
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetRendaRef}
        index={-1}
        snapPoints={['30%']}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: cores.card }}
        handleIndicatorStyle={{ backgroundColor: cores.border }}
      >
        <BottomSheetView style={[styles.sheetContent, { backgroundColor: cores.card }]}>
          <Text style={[styles.sheetTitulo, { color: cores.textPrimario }]}>Renda mensal</Text>
          <TextInput
            style={[styles.sheetInput, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
            placeholder="Ex: 3000"
            placeholderTextColor={cores.textSecundario}
            keyboardType="numeric"
            value={rendaTemp}
            onChangeText={setRendaTemp}
          />
          <TouchableOpacity
            style={styles.sheetBotao}
            onPress={() => { Keyboard.dismiss(); if (rendaTemp) setRenda(rendaTemp); bottomSheetRendaRef.current?.close(); }}
            activeOpacity={0.85}
          >
            <Text style={styles.sheetBotaoTexto}>Salvar</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetHorasRef}
        index={-1}
        snapPoints={['30%']}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: cores.card }}
        handleIndicatorStyle={{ backgroundColor: cores.border }}
      >
        <BottomSheetView style={[styles.sheetContent, { backgroundColor: cores.card }]}>
          <Text style={[styles.sheetTitulo, { color: cores.textPrimario }]}>Horas trabalhadas</Text>
          <TextInput
            style={[styles.sheetInput, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
            placeholder="Ex: 160"
            placeholderTextColor={cores.textSecundario}
            keyboardType="numeric"
            value={horasTemp}
            onChangeText={setHorasTemp}
          />
          <TouchableOpacity
            style={styles.sheetBotao}
            onPress={() => { Keyboard.dismiss(); if (horasTemp) setHoras(horasTemp); bottomSheetHorasRef.current?.close(); }}
            activeOpacity={0.85}
          >
            <Text style={styles.sheetBotaoTexto}>Salvar</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
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
    color: CoresFixas.branco,
  },
  perfilInfo: {
    flex: 1,
    gap: 2,
  },
  perfilNome: {
    fontSize: 18,
    fontWeight: '700',
    color: CoresFixas.branco,
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
  sheetContent: {
    padding: 20,
    gap: 12,
    paddingBottom: 36,
  },
  sheetTitulo: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  sheetOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  sheetOpcaoTexto: {
    fontSize: 15,
    fontWeight: '500',
  },
  sheetInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  sheetBotao: {
    backgroundColor: CoresFixas.azul,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: CoresFixas.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  sheetBotaoTexto: {
    color: CoresFixas.branco,
    fontSize: 16,
    fontWeight: '700',
  },
});