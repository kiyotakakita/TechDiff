import { TermData } from '../types';

export const INITIAL_TERMS: TermData[] = [
  {
    id: 'regex',
    name: '正規表現 (Regular Expressions)',
    reading: 'Regex',
    category: 'ai',
    categoryLabel: '開発・エンジニアリング',
    stage: 'innovator',
    stageProgress: 12,
    summary: '概念の理解は必須だが、複雑な記号パターンの手書きはAIに完全代替された代表例',
    definition: '文字列のパターンを表現する基礎手法。「何ができるか」の概念知識は必須だが、暗号のような構文を人間が暗記して手書きする必要は消滅した。',
    firstAppearedYear: 1951,
    tags: ['文字列処理', '手順の消滅', 'AI丸投げ推奨'],
    journey: [
      { phase: 'origin', phaseTitle: '【1. 不変の基礎】', year: '普遍の原理', platform: '形式言語理論', title: 'パターンによる検索・置換の概念', description: '規則性を見つけて一括処理できるというメンタルモデル自体は絶対に変わらない。', keyArtifact: 'メタ文字、グループ化' },
      { phase: 'spread', phaseTitle: '【2. 従来の定石】', year: 'Pre-AI時代', platform: 'チートシート', title: '複雑な記号の暗記と手作業での試行錯誤', description: 'バックスラッシュだらけの呪文を手書きしては1文字違いでバグらせていた。', keyArtifact: '先読み・後読みの暗記' },
      { phase: 'border_crossing', phaseTitle: '【3. 古くなった情報】', year: 'AI転換点', platform: '構文の丸暗記', title: '複雑な正規表現を人間が頭をひねって書く作業', description: 'LLMは正規表現の生成と解読が極めて得意なため、人間がゼロから書く時間は非効率となった。', keyArtifact: '手書きのワンライナー' },
      { phase: 'mainstream', phaseTitle: '【4. AI時代の応用】', year: '現在の新標準', platform: 'AI生成×検証', title: '「通したい例・弾きたい例」をAIに渡して生成させる', description: '人間は境界条件（テストケース）の言語化に集中し、式自体はAIに書かせるのが標準。', keyArtifact: 'サンプル主導の生成' }
    ],
    insights: { comprehensionScore: 85, daysTraveled: 27000, targetAudience: '全開発者', chasmStatus: 'settled', recommendedContext: '文字列抽出・検証', riskLevel: '一般常識' },
    audienceSafety: {
      executiveClient: { status: 'safe', statusLabel: '🟢 普遍・安全', confusionProbability: 15, advice: '手作業で時間をかける領域ではありません。テストケースの網羅性に時間を割きましょう。' },
      techInternal: { status: 'safe', statusLabel: '🟢 必須の基礎', advice: '他人の正規表現を読む際も、AIに意味と穴を聞くのが最速です。' },
      paraphraseSuggestion: { plainTerm: '条件の例示によるAIパターン生成', exampleSentence: '基礎概念だけ押さえ、具体的な式はOK/NG例をAIに渡して生成・検証させるのが標準です。' }
    },
    semanticShift: {
      originalMeaning: '【変わらない基礎】文字列のパターンを定義し、検索・置換を自動化する仕組み。',
      originalContext: '【古くなった情報】メタ文字の仕様を暗記し、自力で組み立てる職人芸。',
      currentNuance: '【AI時代の応用】やりたいことと例外ケースを言語化してAIに出力させ、人間は検証に回る。',
      shiftHighlight: '【差分の核心】「構文を書く力」から「エッジケースを漏れなく挙げる力」への完全移行。'
    }
  },
  {
    id: 'debugging',
    name: 'エラー解決・デバッグ手法',
    reading: 'Debugging',
    category: 'ai',
    categoryLabel: '開発・エンジニアリング',
    stage: 'early_adopter',
    stageProgress: 26,
    summary: '「エラー文でググる」から「文脈ごとAIに渡し、人間は原因の筋道を確認する」へ作法が逆転',
    definition: '不具合の原因を特定し修正するプロセス。仮説検証の思考法は不変だが、情報探索と一次切り分けのワークフローが180度逆転した。',
    firstAppearedYear: 1947,
    tags: ['作法の逆転', 'ログ分析', '仮説検証'],
    journey: [
      { phase: 'origin', phaseTitle: '【1. 不変の基礎】', year: '普遍の原理', platform: '仮説検証', title: 'エラー出力と事実（一次情報）を正しく観察する原則', description: '何が期待値で、どこで落ちたかという事実を観察する基礎姿勢は絶対に変わらない。', keyArtifact: '問題の切り分け' },
      { phase: 'spread', phaseTitle: '【2. 従来の定石】', year: 'Pre-AI時代', platform: 'Google検索', title: 'エラー文をコピペして検索し、似た記事を探す', description: '何年も前のStack Overflowから自分の環境に合う解決策を何時間も探していた。', keyArtifact: '検索キーワード選定' },
      { phase: 'border_crossing', phaseTitle: '【3. 古くなった情報】', year: 'AI転換点', platform: '当てずっぽう検索', title: '文脈のない検索と、理由不明なままのコマンド実行', description: '古い記事のコマンドをそのまま打ち込んで環境を余計に壊すパターン。', keyArtifact: '雰囲気での再実行' },
      { phase: 'mainstream', phaseTitle: '【4. AI時代の応用】', year: '現在の新標準', platform: 'AI対話デバッグ', title: 'エラー全文＋実行環境＋直前の操作をセットでAIに渡す', description: '検索するのではなく、手元の状況を丸ごとAIに貼り付け、原因の仮説を出させて人間が判断する。', keyArtifact: 'コンテキスト一括共有' }
    ],
    insights: { comprehensionScore: 95, daysTraveled: 28000, targetAudience: '全開発者', chasmStatus: 'crossed', recommendedContext: 'エラー発生時', riskLevel: '一般常識' },
    audienceSafety: {
      executiveClient: { status: 'safe', statusLabel: '🟢 普遍・安全', confusionProbability: 10, advice: 'トラブル解決の基本は今も昔も正確な状況把握です。' },
      techInternal: { status: 'caution', statusLabel: '🟡 やり方変化', advice: 'ググって探す時間をゼロにし、AIに正確なエラー出力と環境情報を渡すことに集中しましょう。' },
      paraphraseSuggestion: { plainTerm: 'コンテキスト一括提示によるAI協調デバッグ', exampleSentence: '今はエラーログ全文と環境をAIに直接渡して原因を特定させるのが標準です。' }
    },
    semanticShift: {
      originalMeaning: '【変わらない基礎】エラー出力を観察し、原因の仮説を立てて切り分ける論理的思考。',
      originalContext: '【古くなった情報】検索エンジンで古い記事から自分の環境に近いものを手作業で探す作業。',
      currentNuance: '【AI時代の応用】自分の固有環境とエラーログをそのままAIに読ませ、処方箋を引き出す。',
      shiftHighlight: '【差分の核心】「検索ワードを工夫する力」から「エラーの前後状況を正確にAIへ渡す力」への変化。'
    }
  },
  {
    id: 'github-ui-actions',
    name: 'GitHubの仕様・Actions運用',
    reading: 'GitHub UI & Workflows',
    category: 'productivity',
    categoryLabel: 'ツール操作・ワークフロー',
    stage: 'early_majority',
    stageProgress: 48,
    nearChasm: true,
    summary: '裏側のCI/CDやSecretsの本質は不変だが、画面UIやメニュー配置は頻繁に流動する代表例',
    definition: '自動ビルド（Actions）とリポジトリ管理。概念は普遍的だが、スマホ表示やタブ折りたたみ等のUI仕様変更で迷子になりやすい。',
    firstAppearedYear: 2018,
    tags: ['UI・仕様の流動', 'GitHub Actions', 'Secrets'],
    journey: [
      { phase: 'origin', phaseTitle: '【1. 不変の基礎】', year: '普遍の原理', platform: '環境変数と自動化', title: 'Pushで自動実行と秘密鍵の分離（Secrets）', description: 'APIキーをSecretsに隠すこと、Pushを合図に自動ビルドが走る仕組み自体は絶対に変わらない。', keyArtifact: 'Pushトリガー、Secrets' },
      { phase: 'spread', phaseTitle: '【2. 従来の定石】', year: 'Pre-AI時代', platform: 'スクショ手順書', title: '「画面のここをクリック」記事への依存', description: 'ブログ記事のスクリーンショット手順を頼りに設定を行っていた。', keyArtifact: 'スクショ頼みの操作' },
      { phase: 'border_crossing', phaseTitle: '【3. 古くなった情報】', year: '仕様変更', platform: 'UI配置の暗記', title: 'ボタンの視覚的な位置で機能を覚えること', description: '画面幅による「...」への折りたたみ、モバイルUI変更など、見た目の仕様はすぐ陳腐化する。', keyArtifact: 'タブ非表示・折りたたみ' },
      { phase: 'mainstream', phaseTitle: '【4. AI時代の応用】', year: '現在の新標準', platform: 'URL直叩き×CLI', title: 'UIが変わっても揺るがないURL構造とTermuxの活用', description: '末尾に「/actions」や「/settings」を足すURL原則を知り、AIにコマンドを作らせてTermuxから操作する。', keyArtifact: 'URL構造とGitコマンド' }
    ],
    insights: { comprehensionScore: 78, daysTraveled: 2900, targetAudience: 'スマホ・クラウド開発者', chasmStatus: 'crossing', recommendedContext: 'リポジトリ設定時', riskLevel: '一般常識' },
    audienceSafety: {
      executiveClient: { status: 'caution', statusLabel: '🟡 要アップデート', confusionProbability: 50, advice: '画面デザインはすぐ変わります。手順書ではなく概念で理解しておきましょう。' },
      techInternal: { status: 'caution', statusLabel: '🔴 仕様変更注意', advice: 'スマホではタブが隠れます。URL末尾のパス構造（/actions等）を覚えておくと一生迷いません。' },
      paraphraseSuggestion: { plainTerm: 'UIの変化に惑わされないURL・コマンド運用', exampleSentence: '画面の配置はすぐ変わりますが、裏側のURL構造やSecretsの原則は一切変わりません。' }
    },
    semanticShift: {
      originalMeaning: '【変わらない基礎】イベントに応じて処理を自動実行し、機密情報はSecretsに隔離する構造。',
      originalContext: '【古くなった情報】古い解説サイトにある「画面のこの位置のボタンを押す」という視覚的な記憶。',
      currentNuance: '【AI時代の応用】UI変更で迷ったら即AIに聞き、URL直指定やTermuxコマンドでショートカットする。',
      shiftHighlight: '【差分の核心】「変わりやすい画面UI」と「変わらないURL・Git構造」を切り分ける視点。'
    }
  },
  {
    id: 'git-core',
    name: 'Gitの概念とリポジトリ設計',
    reading: 'Git Architecture',
    category: 'business',
    categoryLabel: '設計・マネジメント',
    stage: 'late_majority',
    stageProgress: 74,
    summary: 'AIがコードを大量生成する時代だからこそ、別リポジトリへの切り出しや履歴管理の基礎価値が倍増',
    definition: '変更履歴を記録し、GitHubと手元を繋ぐバージョン管理。AI時代において人間のセーブポイントとして重要度が跳ね上がった。',
    firstAppearedYear: 2005,
    tags: ['基礎の重要度倍増', 'remote', 'clone'],
    journey: [
      { phase: 'origin', phaseTitle: '【1. 不変の基礎】', year: '普遍の原理', platform: 'リモート接続', title: '手元のフォルダとGitHub上の保存場所の紐付け原理', description: 'cloneで複製し、remote set-urlで接続先を切り替え、pushで送り出す構造は一切変わらない。', keyArtifact: 'Commit, Remote(origin)' },
      { phase: 'spread', phaseTitle: '【2. 従来の定石】', year: 'Pre-AI時代', platform: '手動の差分記録', title: '人間が数時間かけて書いたコードを少しずつ保存する', description: '人間が書くスピードが遅かったため、作業終了時のバックアップ感覚だった。', keyArtifact: '手動コーディングの記録' },
      { phase: 'border_crossing', phaseTitle: '【3. 古くなった情報】', year: 'AI転換点', platform: 'コマンド丸暗記', title: '複雑なGitコマンドのオプションを自力で暗記すること', description: 'コマンド自体はAIに作らせればよい。ただし接続先（origin）を意識しないと別アプリを上書きする危険がある。', keyArtifact: 'オプションの丸暗記' },
      { phase: 'mainstream', phaseTitle: '【4. AI時代の応用】', year: '現在の新標準', platform: '過去資産の魔改造', title: '過去リポジトリを複製し、プロンプト差し替えで新アプリを量産', description: '過去作（LexiCurve等）を別名でcloneし、新リポジトリへ繋ぎ変えてAIで中身を一気に魔改造する錬金術。', keyArtifact: '過去作の骨格流用×AI' }
    ],
    insights: { comprehensionScore: 92, daysTraveled: 7600, targetAudience: 'AI開発者', chasmStatus: 'settled', recommendedContext: '別プロジェクト立ち上げ', riskLevel: '一般常識' },
    audienceSafety: {
      executiveClient: { status: 'safe', statusLabel: '🟢 普遍・安全', confusionProbability: 5, advice: '過去の資産を壊さずに別プロジェクトへ派生させる考え方はAI時代の最強の武器です。' },
      techInternal: { status: 'safe', statusLabel: '🟢 必須の基礎', advice: 'AIに書き換えさせる前にcommitしていつでも戻れる状態にする基礎が重要です。' },
      paraphraseSuggestion: { plainTerm: 'AI魔改造のためのセーブポイント＆骨格複製', exampleSentence: '過去のリポジトリを複製して新しい保存先に繋ぎ変える基礎を知っていれば、10分で新アプリが作れます。' }
    },
    semanticShift: {
      originalMeaning: '【変わらない基礎】ローカルとリモート（GitHub）を紐付け、変更履歴を管理する仕組み。',
      originalContext: '【古くなった情報】無数のGitサブコマンドやオプションを手動で暗記すること。',
      currentNuance: '【AI時代の応用】過去リポジトリをテンプレート資産として別リポジトリへ派生させ、AIで作り変える。',
      shiftHighlight: '【差分の核心】AIが1秒で書き換える時代だからこそ、人間側で「どの箱に保存するか」を設計する価値が倍増。'
    }
  },
  {
    id: 'taxonomy-index',
    name: '情報設計と独自の索引体系',
    reading: 'Taxonomy & Indexing',
    category: 'culture',
    categoryLabel: '思考法・リサーチ',
    stage: 'laggard',
    stageProgress: 90,
    summary: '辞書的な網羅説明は外部サイトに任せ、人間は「どう分類・索引するか」の切り口を握る不変の原理',
    definition: '知識を特定の目的や視点に沿って構造化する技術。AIやWikipediaが解説を無限に出せる時代において、最後まで人間に残る最も価値の高い領域。',
    firstAppearedYear: 1735,
    tags: ['不変の原理', '独自インデックス', 'アクセプト選別'],
    journey: [
      { phase: 'origin', phaseTitle: '【1. 不変の基礎】', year: '普遍の原理', platform: '分類学', title: '「何を入れるか」ではなく「どの軸で並べるか」が価値を決める', description: '独自の軸（何が古くなり何が変わらないか）で並べることで初めて知的な索引になる。', keyArtifact: '検索軸の独自性' },
      { phase: 'spread', phaseTitle: '【2. 従来の定石】', year: 'Pre-AI時代', platform: '自前Wiki構築', title: '用語の定義そのものを自分のノートに全部書き写す', description: '用語の意味自体を自前で書いて網羅しようとして、更新が追いつかなくなり挫折しがちだった。', keyArtifact: '既存辞典の劣化コピー化' },
      { phase: 'border_crossing', phaseTitle: '【3. 古くなった情報】', year: 'AI転換点', platform: '凡庸な分類の借用', title: '説明文の自前抱え込みと、外部のありきたりなカテゴリの丸写し', description: '一般的な用語解説はWikipedia等へのリンクで足りる。分類軸まで外部に頼ると独自性が消える。', keyArtifact: '全解説の自前抱え込み' },
      { phase: 'mainstream', phaseTitle: '【4. AI時代の応用】', year: '現在の新標準', platform: '独自軸×アクセプト', title: '基礎解説は外部リンクへ任せ、AI時代の差分だけを独自軸で索引化', description: 'AIに差分構造を出させ、基礎辞典は外部へ繋ぎ、自分はアクセプト（承認）する編集長になる。', keyArtifact: '独自5段階軸×アクセプト' }
    ],
    insights: { comprehensionScore: 98, daysTraveled: 105000, targetAudience: '知識体系を作る人', chasmStatus: 'settled', recommendedContext: '辞書・ツール設計', riskLevel: '一般常識' },
    audienceSafety: {
      executiveClient: { status: 'safe', statusLabel: '🟢 普遍・安全', confusionProbability: 5, advice: '10年後も変わらない「知の構造化」の本質です。' },
      techInternal: { status: 'safe', statusLabel: '🟢 必須の基礎', advice: '既存の辞書と同じものを作るのを避け、外部リンクと独自の差分軸を組み合わせる設計は極めてスマートです。' },
      paraphraseSuggestion: { plainTerm: '外部コモンズ連携 × 独自差分インデックス設計', exampleSentence: '用語の説明は外部辞典リンクに任せ、このアプリは「何が不変で何がAIで変わったか」の独自索引とアクセプトに特化しています。' }
    },
    semanticShift: {
      originalMeaning: '【変わらない基礎】情報に独自の視点・分類軸を与え、必要な時に引き出せるようにする原理。',
      originalContext: '【古くなった情報】用語の定義文を自前で全部書き溜めたり、ありきたりな分類を引き写すこと。',
      currentNuance: '【AI時代の応用】AIに基礎と差分を抽出させ、人間がアクセプトして独自の5段階マップに配置する。',
      shiftHighlight: '【差分の核心】人間は「辞書を書く作業員」から「どの軸で索引し何をアクセプトするか決める編集長」へ進化する。'
    }
  }
];
