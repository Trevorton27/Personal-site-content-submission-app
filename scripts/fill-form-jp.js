/**
 * fill-form-jp.js
 *
 * Paste this entire file into the browser DevTools console while the app is
 * running (npm run dev), the form page is open, and the UI language is set
 * to Japanese (日本語). It will populate every field with realistic Japanese
 * sample data so you can immediately click "プロンプトを生成する" to test
 * prompt generation.
 *
 * Usage:
 *   1. Open http://localhost:3000 and sign in
 *   2. Switch the UI to Japanese using the language toggle
 *   3. Open DevTools → Console
 *   4. Paste this script and press Enter
 */

(function fillForm() {
  // ── Helpers ────────────────────────────────────────────────────────────────

  /**
   * Set a value on a React-controlled input, textarea, or select.
   * React overrides the native value setter, so we must reach around it
   * via the prototype, then fire the events React listens on.
   */
  function fill(el, value) {
    if (!el) return;
    const proto =
      el.tagName === "TEXTAREA"
        ? HTMLTextAreaElement.prototype
        : el.tagName === "SELECT"
        ? HTMLSelectElement.prototype
        : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
    setter.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  /** Fill an input/textarea by its placeholder text. */
  function fillByPlaceholder(placeholder, value) {
    const all = document.querySelectorAll("input, textarea, select");
    const el = [...all].find((e) => e.placeholder === placeholder);
    if (!el) {
      console.warn(`fill-form-jp: 要素が見つかりません — placeholder "${placeholder}"`);
      return;
    }
    fill(el, value);
  }

  /**
   * Click a radio button whose adjacent label text starts with the given prefix.
   */
  function clickRadio(groupName, textPrefix) {
    const labels = [...document.querySelectorAll(`input[type="radio"][name="${groupName}"]`)].map(
      (radio) => radio.closest("label")
    );
    const target = labels.find(
      (lbl) => lbl && lbl.textContent.trim().startsWith(textPrefix)
    );
    if (!target) {
      console.warn(`fill-form-jp: ラジオボタンが見つかりません — name="${groupName}", テキスト先頭="${textPrefix}"`);
      return;
    }
    target.querySelector("input").click();
  }

  /** Click a pill/chip button whose exact trimmed text matches `text`. */
  function clickButton(text) {
    const btn = [...document.querySelectorAll("button")].find(
      (b) => b.textContent.trim() === text
    );
    if (!btn) {
      console.warn(`fill-form-jp: ボタンが見つかりません — "${text}"`);
      return;
    }
    btn.click();
  }

  // ── セクション 1: 名前とアイデンティティ ──────────────────────────────────

  fillByPlaceholder("例：山田 太郎", "山田 太郎");
  fillByPlaceholder(
    "例：Webデベロッパー、CS学生、ソフトウェアエンジニア志望",
    "フルスタックデベロッパー"
  );
  // メールは空白のままにするか、テストしたい場合は実際のアドレスを入力
  fillByPlaceholder("you@example.com", "");

  // ── セクション 2: ヒーロー ────────────────────────────────────────────────

  // 見出し — 空白にすると名前から自動入力される
  fillByPlaceholder("例：こんにちは、山田太郎です。", "");

  fillByPlaceholder(
    "例：独学でWeb開発を学んでいます。JavaScriptやReactについて学んだことをブログに書いています。",
    "独学で6週間でゼロからフルスタックWebアプリを作れるようになりました。JavaScriptとReactが大好きで、実際に動くものを作ることにやりがいを感じています。"
  );

  fillByPlaceholder("作品を見る", "作品を見る");
  fillByPlaceholder("ブログを読む", "ブログを読む");

  // ── セクション 3: 自己紹介 ────────────────────────────────────────────────

  fillByPlaceholder(
    "例：6週間前に全くの初心者としてWeb開発を始めました。今では動くウェブサイト、ブログ、いくつかのプロジェクトを持っています。チームで学び続ける機会を探しています。",
    "6週間前、全くのプログラミング未経験からHTML・CSS・JavaScriptを独学で始めました。その後、天気アプリ、ローカルストレージを使ったToDoリスト、そしてこの個人サイトを作りました。async/await、DOM操作、Reactフックについて、今ではGoogle検索なしで説明できるようになりました。"
  );

  fillByPlaceholder(
    "例：コーディング以外では、ハイキングや写真撮影を楽しんでいます。東京在住です。",
    "コーディング以外の時間は、愛犬とハイキングをしたり、フィルム写真を楽しんでいます。東京在住で、リモートでの機会も歓迎しています。"
  );

  // ── セクション 4: プロジェクト ────────────────────────────────────────────

  fillByPlaceholder("例：天気ダッシュボード", "天気ダッシュボード");

  fillByPlaceholder(
    "例：公開APIから天気情報を取得するアプリ。fetchとasync/awaitを初めて使ったプロジェクト。",
    "OpenWeather APIからリアルタイムの天気情報と5日間の予報を取得するレスポンシブ天気アプリ。fetchとasync/awaitを初めて使ったプロジェクトで、エラーハンドリングとローディング状態の実装を学びました。"
  );

  // カテゴリー選択 — ページ内の最初の <select> を探す
  const categorySelect = document.querySelector("select");
  if (categorySelect) fill(categorySelect, "Webアプリ");

  fillByPlaceholder("HTML, CSS, JavaScript", "HTML, CSS, JavaScript, OpenWeather API");
  fillByPlaceholder("https://github.com/...", "https://github.com/yamadataro/weather-dashboard");
  fillByPlaceholder("https://...", "https://weather.yamadataro.dev");

  // ── セクション 5: ブログ記事 ──────────────────────────────────────────────

  fillByPlaceholder(
    "例：コーディング最初の1週間で学んだこと",
    "コーディング最初の1週間で学んだこと"
  );

  // 日付入力 — type="date" で検索
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) fill(dateInput, "2026-06-15");

  fillByPlaceholder(
    "例：1週間前はコーディング経験ゼロでした。一番驚いたことを紹介します。",
    "1週間前はコーディング経験ゼロでした。社会人になってからプログラミングを学ぶ中で、一番驚いたことを紹介します。"
  );

  fillByPlaceholder(
    "## はじめに\n\nここに記事を書いてください...\n\n## 学んだこと\n\n...",
    `## きっかけ

友人が作ったシンプルなウェブページを見て、「自分にもできるかも」と思いました。有名な最後の言葉です。

## 学んだこと

「概念を理解する」と「実際に頭の中からコードを書き出せる」の間には、大きなギャップがあります。ドキュメントを読むことと、実際に作ることはまったく別物です。

## 一番驚いたこと

フィードバックループの速さです。JavaScriptを1行書いて、ブラウザを開けば、すぐ結果が見えます（うまくいっても、いかなくても）。コンパイルもビルドパイプラインも不要。この即時性には感動しました。

## 次のステップ

基礎が体に染み込むまで、小さなプロジェクトを作り続けます。その後、本格的なフルスタックアプリに挑戦します。`
  );

  // ── セクション 6: お問い合わせ ───────────────────────────────────────────

  fillByPlaceholder("お問い合わせ", "お問い合わせ");
  fillByPlaceholder(
    "ご質問やお仕事のご相談はこちらからどうぞ。",
    "ご質問やお仕事のご相談など、お気軽にご連絡ください。"
  );

  // ── セクション 7: デザイン・スタイル ─────────────────────────────────────

  // バイブボタン
  clickButton("クリーン＆ミニマル");

  fillByPlaceholder("例：ソフトブルーと温かみのあるホワイト", "ソフトブルーと温かみのあるホワイト");
  fillByPlaceholder("例：ティール、#3B82F6、コーラル", "#3B82F6");

  // ラジオグループ
  clickRadio("backgroundPref", "ライト");
  clickRadio("fontFeel", "クリーンなサンセリフ");
  clickRadio("layoutFeel", "中央寄せ・細いカラム");

  fillByPlaceholder(
    "例：Linearのウェブサイト、Stripeのミニマリズム、Notionの余白感",
    "Linearのウェブサイト、Stripeのクリーンなタイポグラフィ、Notionの余白感"
  );

  fillByPlaceholder(
    "例：コーポレートではなく個人的な雰囲気にしたい。余白を多めに。アニメーションは不要。",
    "コーポレートではなく個人的で親しみやすい雰囲気にしたい。余白を多めに使い、重いアニメーションは不要。ホバー時の控えめなエフェクト程度なら歓迎。"
  );

  console.log("fill-form-jp: すべてのフィールドに入力しました。「プロンプトを生成する」をクリックしてテストしてください。");
})();
