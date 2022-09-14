<script lang="ts">
  import { apiClient } from "./apiClient";
  import { appState, qs } from "./state";
  import IconArrow from "./IconArrow.svelte";
  
  
  let selectedLang

  // -----------------------
  const langFromUrl = qs.get('lang')
  if (langFromUrl) {
    selectedLang = langFromUrl
  }
  else {
    const userLang = (navigator.language || navigator.userLanguage).split('-')[0]
    console.log('user lang: ' + userLang)
    selectedLang = userLang
  }
  // -----------------------

  $: {
    selectedLang;
    console.log('[] selectedLang change:', selectedLang);

    // qs.set('lang', selectedLang)
    appState.lang = selectedLang

    apiClient.setLang(selectedLang)
  }
</script>

<div class="select-wrapper">
  <select id="searchLanguage" name="language" class="select--real" bind:value="{selectedLang}">
    <option value="af" lang="af">Afrikaans</option>
    <option value="pl" lang="pl">Polski</option>
    <option value="ar" lang="ar">العربية</option><!-- Al-ʿArabīyah -->
    <option value="ast" lang="ast">Asturianu</option>
    <option value="az" lang="az">Azərbaycanca</option>
    <option value="bg" lang="bg">Български</option><!-- Bǎlgarski -->
    <option value="nan" lang="nan">Bân-lâm-gú / Hō-ló-oē</option>
    <option value="bn" lang="bn">বাংলা</option><!-- Bangla -->
    <option value="be" lang="be">Беларуская</option><!-- Belaruskaya -->
    <option value="ca" lang="ca">Català</option>
    <option value="cs" lang="cs">Čeština</option><!-- čeština -->
    <option value="cy" lang="cy">Cymraeg</option><!-- Cymraeg -->
    <option value="da" lang="da">Dansk</option>
    <option value="de" lang="de">Deutsch</option>
    <option value="et" lang="et">Eesti</option>
    <option value="el" lang="el">Ελληνικά</option><!-- Ellīniká -->
    <option value="en" lang="en" selected>English</option><!-- English -->
    <option value="es" lang="es">Español</option>
    <option value="eo" lang="eo">Esperanto</option>
    <option value="eu" lang="eu">Euskara</option>
    <option value="fa" lang="fa">فارسی</option><!-- Fārsi -->
    <option value="fr" lang="fr">Français</option><!-- français -->
    <option value="gl" lang="gl">Galego</option>
    <option value="ko" lang="ko">한국어</option><!-- Hangugeo -->
    <option value="hy" lang="hy">Հայերեն</option><!-- Hayeren -->
    <option value="hi" lang="hi">हिन्दी</option><!-- Hindī -->
    <option value="hr" lang="hr">Hrvatski</option>
    <option value="id" lang="id">Bahasa Indonesia</option>
    <option value="it" lang="it">Italiano</option>
    <option value="he" lang="he">עברית</option><!-- Ivrit -->
    <option value="ka" lang="ka">ქართული</option><!-- Kartuli -->
    <option value="la" lang="la">Latina</option>
    <option value="lv" lang="lv">Latviešu</option>
    <option value="lt" lang="lt">Lietuvių</option>
    <option value="hu" lang="hu">Magyar</option>
    <option value="mk" lang="mk">Македонски</option><!-- Makedonski -->
    <option value="arz" lang="arz">مصرى</option><!-- Maṣrī -->
    <option value="ms" lang="ms">Bahasa Melayu</option>
    <option value="min" lang="min">Bahaso Minangkabau</option>
    <option value="my" lang="my">မြန်မာဘာသာ</option><!-- Myanmarsar -->
    <option value="nl" lang="nl">Nederlands</option>
    <option value="ja" lang="ja">日本語</option><!-- Nihongo -->
    <option value="no" lang="nb">Norsk (bokmål)</option>
    <option value="nn" lang="nn">Norsk (nynorsk)</option>
    <option value="ce" lang="ce">Нохчийн</option><!-- Noxçiyn -->
    <option value="uz" lang="uz">Oʻzbekcha / Ўзбекча</option><!-- Oʻzbekcha -->
    <option value="pt" lang="pt">Português</option>
    <option value="kk" lang="kk">Қазақша / Qazaqşa / قازاقشا</option>
    <option value="ro" lang="ro">Română</option><!-- Română -->
    <option value="ru" lang="ru">Русский</option><!-- Russkiy -->
    <option value="simple" lang="en">Simple English</option>
    <option value="ceb" lang="ceb">Sinugboanong Binisaya</option>
    <option value="sk" lang="sk">Slovenčina</option>
    <option value="sl" lang="sl">Slovenščina</option>
    <option value="sr" lang="sr">Српски / Srpski</option>
    <option value="sh" lang="sh">Srpskohrvatski / Српскохрватски</option>
    <option value="fi" lang="fi">Suomi</option><!-- suomi -->
    <option value="sv" lang="sv">Svenska</option>
    <option value="ta" lang="ta">தமிழ்</option><!-- Tamiḻ -->
    <option value="tt" lang="tt">Татарча / Tatarça</option>
    <option value="th" lang="th">ภาษาไทย</option><!-- Phasa Thai -->
    <option value="tg" lang="tg">Тоҷикӣ</option><!-- Tojikī -->
    <option value="azb" lang="azb">تۆرکجه</option><!-- Türkce -->
    <option value="tr" lang="tr">Türkçe</option><!-- Türkçe -->
    <option value="uk" lang="uk">Українська</option><!-- Ukrayins’ka -->
    <option value="ur" lang="ur">اردو</option><!-- Urdu -->
    <option value="vi" lang="vi">Tiếng Việt</option>
    <option value="vo" lang="vo">Volapük</option>
    <option value="war" lang="war">Winaray</option>
    <option value="zh-yue" lang="yue">粵語</option><!-- Yuht Yúh / Jyut6 jyu5 -->
    <option value="zh" lang="zh">中文</option><!-- Zhōngwén -->
  </select>

  <div class='select--fake'>
    <label for="searchLanguage">{selectedLang}</label>
    <IconArrow />
  </div>
</div>


<style lang="postcss">
  .select-wrapper {
    position: relative;

    font-size: 0.85rem;

    width: min-content;
    margin: 0.5em;

    &:hover {
      /* from wikipedia.org */
      background-color: #f8f9fa;
    }

    overflow: hidden;
  }

  .select--fake,
  .select--real {
    padding: 0.2em 0.3em;
  }

  .select--real {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    width: 100%;

    color: inherit;

    appearance: none;
    opacity: 0;
    cursor: pointer;

    padding-left: 1.5em;
    padding-right: 1.5em;

    & option {
      padding: 0 1.5em;
    }
  }

  .select--fake {
    width: 100%;
    border: 1px solid transparent;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border: 1.4px solid transparent;


    & > :global(.icon) {
      height: 0.7em;
      width: 0.7em;

      position: relative;

      display: inline-block;
      margin-left: 3px;
    }

    & label {
      text-transform: uppercase;
    }
  }

  .select--real:focus ~ .select--fake {
    border-color: blue;
  }
</style>