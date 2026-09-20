import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CoresFixas } from "@/constants/cores";
import { useCores } from "@/constants/useCores";
import { useTema } from "@/contexts/temaContexto";

function makeSvg(cor: string) {
  return `<svg width="393" height="72" viewBox="0 0 393 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 40.2005C0 15.9173 21.4905 -2.71049 45.5834 0.324674C154.55 14.052 232.191 16.92 346.371 1.30801C370.829 -2.03618 393 16.6882 393 41.3738V71.2496H0V40.2005Z" fill="${cor}"/></svg>`;
}

function makeSvgFundo(cor: string) {
  return `<svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="210" cy="210" r="180" stroke="${cor}" stroke-opacity="0.15" stroke-width="1.5"/>
    <circle cx="210" cy="210" r="140" stroke="${cor}" stroke-opacity="0.12" stroke-width="1.5"/>
    <circle cx="210" cy="210" r="100" stroke="${cor}" stroke-opacity="0.1" stroke-width="1.5"/>
    <line x1="210" y1="30" x2="210" y2="55" stroke="${cor}" stroke-opacity="0.4" stroke-width="3" stroke-linecap="round"/>
    <line x1="210" y1="30" x2="210" y2="120" stroke="${cor}" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round" transform="rotate(60 210 210)"/>
    <line x1="210" y1="30" x2="210" y2="90" stroke="${cor}" stroke-opacity="0.3" stroke-width="3" stroke-linecap="round" transform="rotate(150 210 210)"/>
  </svg>`;
}

export default function EsqueciSenhaScreen() {
  const router = useRouter();
  const cores = useCores();
  const { isDark } = useTema();

  const logo = isDark
    ? require("@/assets/images/logo_completa_mindcash_escura.png")
    : require("@/assets/images/logo_completa_mindcash_clara.png");

  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  async function handleEnviar() {
    if (!email) {
      setErro("Digite seu e-mail.");
      return;
    }
    setErro("");
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setEnviado(true);
    }, 1000);
  }

  return (
    <View style={[styles.container, { backgroundColor: cores.card }]}>
      <StatusBar
        barStyle={cores.authStatusBar as "light-content" | "dark-content"}
        backgroundColor={cores.authHeaderBg}
        translucent
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: cores.authHeaderBg }]}>
        <SvgXml
          xml={makeSvgFundo(cores.authSvgFundo)}
          width="420"
          height="420"
          style={styles.svgFundo}
        />
        <SafeAreaView edges={["top"]} style={styles.safeHeader}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={[styles.titulo, { color: cores.authTitulo }]}>
            Esqueci minha senha
          </Text>
          <Text style={[styles.subtitulo, { color: cores.authSubtitulo }]}>
            Vamos te ajudar a recuperar o acesso
          </Text>
        </SafeAreaView>
      </View>

      {/* Ondas de transição */}
      <SvgXml xml={makeSvg(cores.authOnda1)} width="100%" height={72} preserveAspectRatio="none" style={styles.onda1} />
      <SvgXml xml={makeSvg(cores.authOnda2)} width="100%" height={72} preserveAspectRatio="none" style={styles.onda2} />
      <SvgXml xml={makeSvg(cores.authOnda3)} width="100%" height={72} preserveAspectRatio="none" style={styles.onda3} />

      {/* Formulário */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={[styles.card, { backgroundColor: cores.card }]}
          contentContainerStyle={styles.cardConteudo}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {!enviado ? (
            <>
              <Text style={[styles.descricao, { color: cores.textSecundario }]}>
                Digite seu e-mail e enviaremos um link para redefinir sua senha.
              </Text>

              {/* Campo e-mail */}
              <View style={[styles.inputWrapper, { backgroundColor: cores.inputBg, borderColor: cores.inputBorder }]}>
                <Ionicons name="mail-outline" size={20} color={CoresFixas.azulClaro} style={styles.inputIcone} />
                <TextInput
                  style={[styles.input, { color: cores.textPrimario }]}
                  placeholder="E-mail"
                  placeholderTextColor={cores.textSecundario}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => { setEmail(text); setErro(""); }}
                />
              </View>

              {erro ? <Text style={styles.erro}>{erro}</Text> : null}

              {/* Botão */}
              <TouchableOpacity
                style={[styles.botao, carregando && styles.botaoDesabilitado]}
                onPress={handleEnviar}
                disabled={carregando}
                activeOpacity={0.85}
              >
                {carregando
                  ? <ActivityIndicator color={CoresFixas.branco} />
                  : <Text style={styles.botaoTexto}>Enviar link</Text>
                }
              </TouchableOpacity>
            </>
          ) : (
            /* Estado de sucesso */
            <View style={styles.sucessoContainer}>
              <Text style={styles.sucessoIcone}>✉️</Text>
              <Text style={[styles.sucessoTitulo, { color: cores.textPrimario }]}>
                E-mail enviado!
              </Text>
              <Text style={[styles.sucessoTexto, { color: cores.textSecundario }]}>
                Verifique sua caixa de entrada e clique no link para redefinir sua senha.
              </Text>
            </View>
          )}

          {/* Rodapé */}
          <View style={styles.rodape}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
              <Text style={[styles.link, { color: cores.authLink }]}>
                ← Voltar para o login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 140,
  },
  safeHeader: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 16,
    gap: 8,
  },
  svgFundo: {
    position: "absolute",
    bottom: -30,
    right: -120,
    opacity: 1,
  },
  logo: {
    width: 260,
    height: 85,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
  },
  subtitulo: {
    fontSize: 12,
    fontWeight: "500",
  },
  onda1: {
    position: "absolute",
    top: 259,
    left: 0,
    right: 0,
    zIndex: 7,
  },
  onda2: {
    position: "absolute",
    top: 285,
    left: 0,
    right: 0,
    zIndex: 8,
  },
  onda3: {
    position: "absolute",
    top: 317,
    left: 0,
    right: 0,
    zIndex: 9,
  },
  card: {
    flex: 1,
  },
  cardConteudo: {
    paddingHorizontal: 36,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1.5,
    height: 56,
    paddingHorizontal: 14,
  },
  inputIcone: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  erro: {
    color: CoresFixas.erro,
    fontSize: 12,
    marginTop: -4,
  },
  botao: {
    backgroundColor: CoresFixas.azul,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: CoresFixas.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: CoresFixas.branco,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  rodapeTexto: {
    fontSize: 14,
    opacity: 0.8,
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
  },
  // específicos desta tela
  descricao: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 4,
  },
  sucessoContainer: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 24,
  },
  sucessoIcone: {
    fontSize: 48,
  },
  sucessoTitulo: {
    fontSize: 18,
    fontWeight: "700",
  },
  sucessoTexto: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
});