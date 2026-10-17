// Direct Client-side Gemini API Service with model selection and strict error reporting
import { TermData } from '../types';
import { normalizeTermData } from '../utils/normalizeTerm';

export interface GeminiModelOption {
  id: string;
  name: string;
  badge?: string;
  description: string;
}

export const PRESET_GEMINI_MODELS: GeminiModelOption[] = [
  {
    id: 'gemini-flash-latest',
    name: 'gemini-flash-latest',
    badge: '推奨・最新自動追従',
    description: 'Googleが常に最新の安定版Flashモデルにルーティングする公式推奨モデル',
  },
  {
    id: 'gemini-2.5-flash',
    name: 'gemini-2.5-flash',
    badge: '高速推論',
    description: '思考・推論能力と低レイテンシーを両立した2.5世代Flashモデル',
  },
  {
    id: 'gemini-3.7-flash',
    name: 'gemini-3.7-flash',
    badge: '次世代ハイブリッド',
    description: '最新ハイブリッド推論対応の3.7世代Flashモデル',
  },
];

const LOCAL_STORAGE_KEY = 'lexicurve_gemini_api_key';
const LOCAL_STORAGE_MODEL_KEY = 'lexicurve_gemini_selected_model';

export function getClientGeminiApiKey(): string {
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim();
  if (envKey) return envKey;

  try {
    const localKey = localStorage.getItem(LOCAL_STORAGE_KEY)?.trim();
    if (localKey) return localKey;
  } catch {
    // Ignore localStorage access errors
  }

  return '';
}

export function setClientGeminiApiKey(key: string) {
  try {
    if (key.trim()) {
      localStorage.setItem(LOCAL_STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch {
    // Ignore
  }
}

export function getClientGeminiModel(): string {
  try {
    const localModel = localStorage.getItem(LOCAL_STORAGE_MODEL_KEY)?.trim();
    if (localModel) return localModel;
  } catch {
    // Ignore
  }
  const envModel = (import.meta.env.VITE_GEMINI_MODEL as string | undefined)?.trim();
  if (envModel) return envModel;

  return 'gemini-flash-latest';
}

export function setClientGeminiModel(modelId: string) {
  try {
    if (modelId.trim()) {
      localStorage.setItem(LOCAL_STORAGE_MODEL_KEY, modelId.trim());
    }
  } catch {
    // Ignore
  }
}

const ANALYSIS_PROMPT_TEMPLATE = (word: string) => `あなたは技術概念・業務知識の「時代を超えて変わらない基礎（不変の原理）」と「AI時代によって古くなった情報・新しく変わった応用（差分）」を体系化する『技術差分辞典（TechDiff）』の編纂AIです。
入力されたトピック・単語「${word}」について、基礎知識とAI時代の変化の差分を分析し、以下のJSON形式で出力してください。

【出力要件】
必ず以下のキーを持つ有効なJSONのみを出力してください（Markdownのバッククォート \`\`\`json も不要です）：
{
  "name": "トピック・技術の正式名称（例: ${word}）",
  "reading": "読み方または英語表記",
  "category": "productivity" | "ai" | "business" | "culture" のいずれか1つ,
  "categoryLabel": "生産性・ライフハック" | "AI・テクノロジー" | "ビジネス・働き方" | "カルチャー・若者言葉" のいずれか,
  "stage": "innovator" | "early_adopter" | "early_majority" | "late_majority" | "laggard" のいずれか（AIによる変革の進行度。右に行くほど基礎が枯れていて不変性が高い）,
  "stageProgress": 0から100の数値（1〜30: AIで激変中の最新領域、31〜70: 基礎の上にAI応用が乗る領域、71〜100: 10年後も変わらない普遍の基礎領域）,
  "nearChasm": boolean（従来のやり方からAI流のやり方へ移行する過渡期ならtrue、それ以外はfalse）,
  "summary": "「何が不変の基礎で、何がAIで変わったか」の1行要約（50文字以内）",
  "definition": "この概念の時代を超えた本質的な定義と、AI時代における位置づけ（100文字程度）",
  "firstAppearedYear": 基礎概念が誕生したおおよその西暦（整数、例: 2005）,
  "tags": ["不変の基礎", "AI時代の差分", "関連キーワード1", "関連キーワード2"],
  "journey": [
    {
      "phase": "origin",
      "phaseTitle": "【1. 不変の基礎（Core）】",
      "year": "普遍の原理",
      "platform": "基礎理論・メンタルモデル",
      "title": "絶対に変わらない本質・仕組み",
      "description": "AIがどれだけ進化しても人間が理解しておくべき基礎原理や仕組みの解説",
      "keyArtifact": "押さえるべき基礎概念・キーワード"
    },
    {
      "phase": "spread",
      "phaseTitle": "【2. 従来の定石（Legacy）】",
      "year": "Pre-AI時代",
      "platform": "従来のワークフロー・手法",
      "title": "これまで当たり前だったやり方",
      "description": "AI普及以前に行われていた手順や、当時のベストプラクティス",
      "keyArtifact": "従来よく使われていたツールや作法"
    },
    {
      "phase": "border_crossing",
      "phaseTitle": "【3. 古くなった情報（Obsolete）】",
      "year": "AIによる転換点",
      "platform": "自動化・代替された領域",
      "title": "今やると非効率になる古い作法",
      "description": "仕様変更やAIの台頭により、人間が手作業でやる必要がなくなった・陳腐化した知識",
      "keyArtifact": "手放すべき古い固定観念・アンチパターン"
    },
    {
      "phase": "mainstream",
      "phaseTitle": "【4. AI時代の応用（AI-Era Diff）】",
      "year": "現在の新標準",
      "platform": "AIネイティブな実践現場",
      "title": "基礎×AIの最新ベストプラクティス",
      "description": "不変の基礎知識を土台にしつつ、AIや最新仕様をどう組み合わせて応用するか",
      "keyArtifact": "今すぐ実践すべきAI時代のアクション"
    }
  ],
  "insights": {
    "comprehensionScore": 0から100の整数（基礎知識の重要度スコア）,
    "daysTraveled": 基礎誕生からの推定経過日数（整数）,
    "targetAudience": "この差分を押さえるべき層（例: 基礎をAI応用に繋げたい開発者）",
    "chasmStatus": "before" | "crossing" | "crossed" | "settled",
    "recommendedContext": "この知識が活きる場面（例: 設計レビュー、トラブルシューティング）",
    "riskLevel": "理解されない" | "意識高いと見られる" | "一般常識" | "今更感"
  },
  "audienceSafety": {
    "executiveClient": {
      "status": "safe" | "caution" | "danger",
      "statusLabel": "🟢 普遍・安全" | "🟡 要アップデート" | "🔴 陳腐化リスク",
      "confusionProbability": 0から100の整数（古い知識のまま止まっている危険度%）,
      "advice": "従来の古いやり方に固執せず、どこをAIに任せてどこを人間が握るべきかの助言"
    },
    "techInternal": {
      "status": "safe" | "caution" | "danger",
      "statusLabel": "🟢 必須の基礎" | "🟡 やり方変化" | "🔴 仕様変更注意",
      "advice": "実務や開発現場において、基礎をどう応用して最新ツールを使いこなすかのアドバイス"
    },
    "paraphraseSuggestion": {
      "plainTerm": "一言でいう「AI時代の新しい定石」",
      "exampleSentence": "「昔は〇〇でしたが、基礎の△△さえ押さえれば、今はAIで□□するのが標準です」という形式のまとめ文"
    }
  },
  "semanticShift": {
    "originalMeaning": "【変わらない基礎】時代やツールが変わっても絶対に揺るがない本質的な原理原則",
    "originalContext": "【古くなった情報】かつては必須だったが、AIや仕様変更で不要・非効率になった知識",
    "currentNuance": "【AI時代の応用】基礎を理解した上で、AIをレバレッジして最速で成果を出す現在のアプローチ",
    "shiftHighlight": "【差分の核心】人間が学ぶべき『基礎』と、AIに任せる『作業』の境界線はどこにあるか"
  }
}`;

async function callGeminiRestApi(prompt: string, modelOverride?: string): Promise<{ text: string; model: string }> {
  const apiKey = getClientGeminiApiKey();
  if (!apiKey) {
    throw new Error('APIキーが設定されていません。右上の設定から入力してください');
  }

  const selectedModel = (modelOverride || getClientGeminiModel()).trim() || 'gemini-flash-latest';
  const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(selectedModel)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  let response: Response;
  try {
    response = await fetch(endpointUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7
        }
      })
    });
  } catch (networkErr: any) {
    throw new Error(`ネットワーク通信エラー: ${networkErr?.message || networkErr}`);
  }

  if (!response.ok) {
    let rawGoogleErrorMessage = '';
    try {
      const errorJson = await response.json();
      if (errorJson?.error) {
        const { code, status, message } = errorJson.error;
        rawGoogleErrorMessage = `${status || code || ''} - ${message || ''}`.trim();
      } else {
        rawGoogleErrorMessage = JSON.stringify(errorJson);
      }
    } catch {
      rawGoogleErrorMessage = await response.text().catch(() => response.statusText);
    }

    throw new Error(`Google API エラー [HTTP ${response.status}]: ${rawGoogleErrorMessage || response.statusText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error(`Google API エラー [HTTP ${response.status}]: モデル「${selectedModel}」からの応答が空でした。`);
  }

  return { text, model: selectedModel };
}

export async function analyzeWordDirect(word: string): Promise<{ term: TermData; model: string }> {
  const query = word.trim();
  const prompt = ANALYSIS_PROMPT_TEMPLATE(query);

  const { text: rawJsonText, model } = await callGeminiRestApi(prompt);

  const cleaned = rawJsonText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch (jsonErr) {
    throw new Error(`Google API エラー: モデル「${model}」が返却したJSONの解析に失敗しました。生出力: ${cleaned.slice(0, 100)}...`);
  }

  const normalized = normalizeTermData(parsed, query);

  return {
    term: normalized,
    model,
  };
}

export async function scanTrendingDirect(): Promise<{ terms: TermData[]; model: string }> {
  const lenses = [
    'Linuxコマンド・シェル操作・パス解決・テキスト処理・正規表現',
    'HTTP通信・DNS・キャッシュ制御・認証認可(OAuth/JWT/Passkey)・ネットワーク',
    '状態管理・CSSレイアウト・ブラウザレンダリング・DOM操作・Web標準API',
    'トランザクション・インデックス設計・JSON/CSV変換・ローカルストレージ',
    '暗号化・SSH鍵管理・CORS・環境変数とシークレット管理・権限設計',
    '非同期処理・メモリ管理・文字コード・データ正規化・計算量とボトルネック',
    'ログ監視・単体テスト設計・CI/CDパイプライン・コンテナ仮想化・ビルド設定',
    'REST/GraphQL設計・技術ドキュメント・仕様の言語化・トレードオフ判断・依存関係管理'
  ];
  const picked = [...lenses].sort(() => 0.5 - Math.random()).slice(0, 2).join(' および ');
  const seed = Math.floor(Math.random() * 99999);

  const prompt = `あなたは技術や業務知識の「変わらない基礎」と「AI時代の最新の応用・差分」を整理する『技術差分辞典』のAIキュレーターです。
[ランダム探索シード: ${seed}]
今回は特に【 ${picked} 】に関連する領域から、一般的なバズワードではなく「昔からある具体的な基礎概念・仕組み・操作」でありながら、「AIの登場や近年の仕様変更によって人間の関わり方が劇的に変わった項目」を5〜6個、鋭い切り口で抽出してください。
※毎回異なる多様な具体的項目を出すこと。ありきたりな「デバッグ」「Git」「SQL」といった大雑把な言葉は避け、より具体的で現場感のある基礎用語を選ぶこと。

必ず以下のキーを持つJSON配列（Array）形式のみを出力してください：
[
  {
    "name": "具体的な基礎用語・技術概念名",
    "description": "何が不変の基礎で、何がAI時代で変わったかの具体的な差分要約",
    "category": "以下の4つの中から最も適切なものを1つ選択: [生産性・ライフハック, AI・テクノロジー, ビジネス・働き方, カルチャー・若者言葉]",
    "score": 知識の不変度とAI変革度のバランス位置（8〜92のばらけた数値）
  }
]`;

  const { text: rawJsonText, model } = await callGeminiRestApi(prompt);

  const cleaned = rawJsonText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch (jsonErr) {
    throw new Error(`Google API エラー: モデル「${model}」が返却したトレンドデータのJSON解析に失敗しました。`);
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(`Google API エラー: モデル「${model}」から取得したトレンドデータが配列形式ではありませんでした。`);
  }

  const normalized = parsed.map((item: any) => {
    const wordName = item?.name || item?.word || item?.title || item?.term || '新着トピック';
    const description = item?.description || item?.explanation || item?.summary || item?.definition || '';
    const category = item?.category || item?.genre || 'AI・テクノロジー';
    const score = item?.score ?? item?.stageProgress ?? item?.position ?? 50;

    const termPayload = {
      ...item,
      name: wordName,
      title: wordName,
      description,
      summary: description,
      definition: description,
      category,
      score,
    };

    return {
      ...normalizeTermData(termPayload, wordName),
      isTrending: true,
      isCustom: true,
    };
  });

  return {
    terms: normalized,
    model,
  };
}
