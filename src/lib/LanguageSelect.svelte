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
    <!-- 0 --> <option value="af" lang="af">Afrikaans (Afrikaans)</option>
    <!-- 1 --> <option value="als" lang="als">Alemannisch (Alemannic)</option>
    <!-- 2 --> <option value="am" lang="am">አማርኛ (Amharic)</option>
    <!-- 3 --> <option value="an" lang="an">Aragonés (Aragonese)</option>
    <!-- 4 --> <option value="ang" lang="ang">Ænglisc (Old English)</option>
    <!-- 5 --> <option value="ann" lang="ann">Obolo (Obolo)</option>
    <!-- 6 --> <option value="anp" lang="anp">अंगिका (Angika)</option>
    <!-- 7 --> <option value="ar" lang="ar">العربية (Arabic)</option>
    <!-- 8 --> <option value="ary" lang="ary">الدارجة (Moroccan Arabic)</option>
    <!-- 9 --> <option value="arz" lang="arz">مصرى (Egyptian Arabic)</option>
    <!-- 10 --> <option value="as" lang="as">অসমীয়া (Assamese)</option>
    <!-- 11 --> <option value="ast" lang="ast">Asturianu (Asturian)</option>
    <!-- 12 --> <option value="awa" lang="awa">अवधी (Awadhi)</option>
    <!-- 13 --> <option value="az" lang="az">Azərbaycanca (Azerbaijani)</option>
    <!-- 14 --> <option value="azb" lang="azb">تۆرکجه (South Azerbaijani)</option>
    <!-- 15 --> <option value="ba" lang="ba">Башҡортса (Bashkir)</option>
    <!-- 16 --> <option value="ban" lang="ban">Basa Bali (Balinese)</option>
    <!-- 17 --> <option value="bat-smg" lang="bat-smg">Žemaitėška (Samogitian)</option>
    <!-- 18 --> <option value="bcl" lang="bcl">Bikol Central (Central Bikol)</option>
    <!-- 19 --> <option value="be-tarask" lang="be-tarask">Беларуская (тарашкевіца) (Belarusian (Taraškievica orthography))</option>
    <!-- 20 --> <option value="be" lang="be">Беларуская (Belarusian)</option>
    <!-- 21 --> <option value="bew" lang="bew">Betawi (Betawi)</option>
    <!-- 22 --> <option value="bg" lang="bg">Български (Bulgarian)</option>
    <!-- 23 --> <option value="bh" lang="bh">भोजपुरी (Bhojpuri)</option>
    <!-- 24 --> <option value="bn" lang="bn">বাংলা (Bangla)</option>
    <!-- 25 --> <option value="bo" lang="bo">བོད་ཡིག (Tibetan)</option>
    <!-- 26 --> <option value="bol" lang="bol">Bòo pìkkà (Bole)</option>
    <!-- 27 --> <option value="br" lang="br">Brezhoneg (Breton)</option>
    <!-- 28 --> <option value="bs" lang="bs">Bosanski (Bosnian)</option>
    <!-- 29 --> <option value="btm" lang="btm">Batak Mandailing (Batak Mandailing)</option>
    <!-- 30 --> <option value="bxr" lang="bxr">Буряад (Russia Buriat)</option>
    <!-- 31 --> <option value="ca" lang="ca">Català (Catalan)</option>
    <!-- 32 --> <option value="cdo" lang="cdo">閩東語 / Mìng-dĕ̤ng-ngṳ̄ (Mindong)</option>
    <!-- 33 --> <option value="ce" lang="ce">Нохчийн (Chechen)</option>
    <!-- 34 --> <option value="ceb" lang="ceb">Cebuano (Cebuano)</option>
    <!-- 35 --> <option value="chr" lang="chr">ᏣᎳᎩ (Cherokee)</option>
    <!-- 36 --> <option value="ckb" lang="ckb">کوردی (Central Kurdish)</option>
    <!-- 37 --> <option value="co" lang="co">Corsu (Corsican)</option>
    <!-- 38 --> <option value="crh" lang="crh">Qırımtatarca (Crimean Tatar)</option>
    <!-- 39 --> <option value="cs" lang="cs">Čeština (Czech)</option>
    <!-- 40 --> <option value="cu" lang="cu">Словѣньскъ / ⰔⰎⰑⰂⰡⰐⰠⰔⰍⰟ (Church Slavic)</option>
    <!-- 41 --> <option value="cv" lang="cv">Чӑвашла (Chuvash)</option>
    <!-- 42 --> <option value="cy" lang="cy">Cymraeg (Welsh)</option>
    <!-- 43 --> <option value="da" lang="da">Dansk (Danish)</option>
    <!-- 44 --> <option value="de" lang="de">Deutsch (German)</option>
    <!-- 45 --> <option value="diq" lang="diq">Zazaki (Dimli)</option>
    <!-- 46 --> <option value="dsb" lang="dsb">Dolnoserbski (Lower Sorbian)</option>
    <!-- 47 --> <option value="dty" lang="dty">डोटेली (Doteli)</option>
    <!-- 48 --> <option value="el" lang="el">Ελληνικά (Greek)</option>
    <!-- 49 --> <option value="eml" lang="eml">Emiliàn e rumagnòl (Emiliano-Romagnolo)</option>
    <!-- 50 --> <option value="eo" lang="eo">Esperanto (Esperanto)</option>
    <!-- 51 --> <option value="es" lang="es">Español (Spanish)</option>
    <!-- 52 --> <option value="et" lang="et">Eesti (Estonian)</option>
    <!-- 53 --> <option value="eu" lang="eu">Euskara (Basque)</option>
    <!-- 54 --> <option value="ext" lang="ext">Estremeñu (Extremaduran)</option>
    <!-- 55 --> <option value="fa" lang="fa">فارسی (Persian)</option>
    <!-- 56 --> <option value="fi" lang="fi">Suomi (Finnish)</option>
    <!-- 57 --> <option value="fiu-vro" lang="fiu-vro">Võro (Võro)</option>
    <!-- 58 --> <option value="fo" lang="fo">Føroyskt (Faroese)</option>
    <!-- 59 --> <option value="fr" lang="fr">Français (French)</option>
    <!-- 60 --> <option value="frr" lang="frr">Nordfriisk (Northern Frisian)</option>
    <!-- 61 --> <option value="fur" lang="fur">Furlan (Friulian)</option>
    <!-- 62 --> <option value="fy" lang="fy">Frysk (Western Frisian)</option>
    <!-- 63 --> <option value="ga" lang="ga">Gaeilge (Irish)</option>
    <!-- 64 --> <option value="gan" lang="gan">贛語 (Gan)</option>
    <!-- 65 --> <option value="gcr" lang="gcr">Kriyòl gwiyannen (Guianan Creole)</option>
    <!-- 66 --> <option value="gd" lang="gd">Gàidhlig (Scottish Gaelic)</option>
    <!-- 67 --> <option value="gl" lang="gl">Galego (Galician)</option>
    <!-- 68 --> <option value="gn" lang="gn">Avañe'ẽ (Guarani)</option>
    <!-- 69 --> <option value="gom" lang="gom">गोंयची कोंकणी / Gõychi Konknni (Goan Konkani)</option>
    <!-- 70 --> <option value="gor" lang="gor">Bahasa Hulontalo (Gorontalo)</option>
    <!-- 71 --> <option value="got" lang="got">𐌲𐌿𐍄𐌹𐍃𐌺 (Gothic)</option>
    <!-- 72 --> <option value="gu" lang="gu">ગુજરાતી (Gujarati)</option>
    <!-- 73 --> <option value="ha" lang="ha">Hausa (Hausa)</option>
    <!-- 74 --> <option value="hak" lang="hak">客家語 / Hak-kâ-ngî (Hakka Chinese)</option>
    <!-- 75 --> <option value="he" lang="he">עברית (Hebrew)</option>
    <!-- 76 --> <option value="hi" lang="hi">हिन्दी (Hindi)</option>
    <!-- 77 --> <option value="hif" lang="hif">Fiji Hindi (Fiji Hindi)</option>
    <!-- 78 --> <option value="hr" lang="hr">Hrvatski (Croatian)</option>
    <!-- 79 --> <option value="hsb" lang="hsb">Hornjoserbsce (Upper Sorbian)</option>
    <!-- 80 --> <option value="ht" lang="ht">Kreyòl ayisyen (Haitian Creole)</option>
    <!-- 81 --> <option value="hu" lang="hu">Magyar (Hungarian)</option>
    <!-- 82 --> <option value="hy" lang="hy">Հայերեն (Armenian)</option>
    <!-- 83 --> <option value="hyw" lang="hyw">Արեւմտահայերէն (Western Armenian)</option>
    <!-- 84 --> <option value="ia" lang="ia">Interlingua (Interlingua)</option>
    <!-- 85 --> <option value="id" lang="id">Bahasa Indonesia (Indonesian)</option>
    <!-- 86 --> <option value="ie" lang="ie">Interlingue (Interlingue)</option>
    <!-- 87 --> <option value="ilo" lang="ilo">Ilokano (Iloko)</option>
    <!-- 88 --> <option value="io" lang="io">Ido (Ido)</option>
    <!-- 89 --> <option value="is" lang="is">Íslenska (Icelandic)</option>
    <!-- 90 --> <option value="isv" lang="isv">Medžuslovjansky (Interslavic)</option>
    <!-- 91 --> <option value="it" lang="it">Italiano (Italian)</option>
    <!-- 92 --> <option value="ja" lang="ja">日本語 (Japanese)</option>
    <!-- 93 --> <option value="jam" lang="jam">Patois (Jamaican Creole English)</option>
    <!-- 94 --> <option value="jbo" lang="jbo">La .lojban. (Lojban)</option>
    <!-- 95 --> <option value="jv" lang="jv">Jawa (Javanese)</option>
    <!-- 96 --> <option value="ka" lang="ka">ქართული (Georgian)</option>
    <!-- 97 --> <option value="kaa" lang="kaa">Qaraqalpaqsha (Kara-Kalpak)</option>
    <!-- 98 --> <option value="kab" lang="kab">Taqbaylit (Kabyle)</option>
    <!-- 99 --> <option value="kaj" lang="kaj">Jju (Jju)</option>
    <!-- 100 --> <option value="kbp" lang="kbp">Kabɩyɛ (Kabiye)</option>
    <!-- 101 --> <option value="kcg" lang="kcg">Tyap (Tyap)</option>
    <!-- 102 --> <option value="kk" lang="kk">Қазақша (Kazakh)</option>
    <!-- 103 --> <option value="km" lang="km">ភាសាខ្មែរ (Khmer)</option>
    <!-- 104 --> <option value="kn" lang="kn">ಕನ್ನಡ (Kannada)</option>
    <!-- 105 --> <option value="knc" lang="knc">Yerwa Kanuri (Central Kanuri)</option>
    <!-- 106 --> <option value="ko" lang="ko">한국어 (Korean)</option>
    <!-- 107 --> <option value="ksh" lang="ksh">Ripoarisch (Colognian)</option>
    <!-- 108 --> <option value="ku" lang="ku">Kurdî (Kurdish)</option>
    <!-- 109 --> <option value="kw" lang="kw">Kernowek (Cornish)</option>
    <!-- 110 --> <option value="la" lang="la">Latina (Latin)</option>
    <!-- 111 --> <option value="lad" lang="lad">Ladino (Ladino)</option>
    <!-- 112 --> <option value="lb" lang="lb">Lëtzebuergesch (Luxembourgish)</option>
    <!-- 113 --> <option value="lez" lang="lez">Лезги (Lezghian)</option>
    <!-- 114 --> <option value="lfn" lang="lfn">Lingua Franca Nova (Lingua Franca Nova)</option>
    <!-- 115 --> <option value="li" lang="li">Limburgs (Limburgish)</option>
    <!-- 116 --> <option value="lij" lang="lij">Ligure (Ligurian)</option>
    <!-- 117 --> <option value="lld" lang="lld">Ladin (Ladin)</option>
    <!-- 118 --> <option value="lmo" lang="lmo">Lombard (Lombard)</option>
    <!-- 119 --> <option value="lo" lang="lo">ລາວ (Lao)</option>
    <!-- 120 --> <option value="lt" lang="lt">Lietuvių (Lithuanian)</option>
    <!-- 121 --> <option value="lv" lang="lv">Latviešu (Latvian)</option>
    <!-- 122 --> <option value="mad" lang="mad">Madhurâ (Madurese)</option>
    <!-- 123 --> <option value="mai" lang="mai">मैथिली (Maithili)</option>
    <!-- 124 --> <option value="map-bms" lang="map-bms">Basa Banyumasan (Banyumasan)</option>
    <!-- 125 --> <option value="mdf" lang="mdf">Мокшень (Moksha)</option>
    <!-- 126 --> <option value="mg" lang="mg">Malagasy (Malagasy)</option>
    <!-- 127 --> <option value="mi" lang="mi">Māori (Māori)</option>
    <!-- 128 --> <option value="min" lang="min">Minangkabau (Minangkabau)</option>
    <!-- 129 --> <option value="mk" lang="mk">Македонски (Macedonian)</option>
    <!-- 130 --> <option value="ml" lang="ml">മലയാളം (Malayalam)</option>
    <!-- 131 --> <option value="mn" lang="mn">Монгол (Mongolian)</option>
    <!-- 132 --> <option value="mni" lang="mni">ꯃꯤꯇꯩ ꯂꯣꯟ (Manipuri)</option>
    <!-- 133 --> <option value="mr" lang="mr">मराठी (Marathi)</option>
    <!-- 134 --> <option value="mrj" lang="mrj">Кырык мары (Western Mari)</option>
    <!-- 135 --> <option value="ms" lang="ms">Bahasa Melayu (Malay)</option>
    <!-- 136 --> <option value="mt" lang="mt">Malti (Maltese)</option>
    <!-- 137 --> <option value="mwl" lang="mwl">Mirandés (Mirandese)</option>
    <!-- 138 --> <option value="my" lang="my">မြန်မာဘာသာ (Burmese)</option>
    <!-- 139 --> <option value="myv" lang="myv">Эрзянь (Erzya)</option>
    <!-- 140 --> <option value="mzn" lang="mzn">مازِرونی (Mazanderani)</option>
    <!-- 141 --> <option value="nah" lang="nah">Nāhuatl (Nahuatl)</option>
    <!-- 142 --> <option value="nds-nl" lang="nds-nl">Nedersaksies (Low Saxon)</option>
    <!-- 143 --> <option value="nds" lang="nds">Plattdüütsch (Low German)</option>
    <!-- 144 --> <option value="ne" lang="ne">नेपाली (Nepali)</option>
    <!-- 145 --> <option value="new" lang="new">नेपाल भाषा (Newari)</option>
    <!-- 146 --> <option value="nl" lang="nl">Nederlands (Dutch)</option>
    <!-- 147 --> <option value="nn" lang="nn">Norsk nynorsk (Norwegian Nynorsk)</option>
    <!-- 148 --> <option value="no" lang="no">Norsk bokmål (Norwegian Bokmål)</option>
    <!-- 149 --> <option value="nov" lang="nov">Novial (Novial)</option>
    <!-- 150 --> <option value="nqo" lang="nqo">ߒߞߏ (N’Ko)</option>
    <!-- 151 --> <option value="nrm" lang="nrm">Nouormand (Norman)</option>
    <!-- 152 --> <option value="oc" lang="oc">Occitan (Occitan)</option>
    <!-- 153 --> <option value="olo" lang="olo">Livvinkarjala (Livvi-Karelian)</option>
    <!-- 154 --> <option value="om" lang="om">Oromoo (Oromo)</option>
    <!-- 155 --> <option value="or" lang="or">ଓଡ଼ିଆ (Odia)</option>
    <!-- 156 --> <option value="os" lang="os">Ирон (Ossetic)</option>
    <!-- 157 --> <option value="pa" lang="pa">ਪੰਜਾਬੀ (Punjabi)</option>
    <!-- 158 --> <option value="pag" lang="pag">Pangasinan (Pangasinan)</option>
    <!-- 159 --> <option value="pam" lang="pam">Kapampangan (Pampanga)</option>
    <!-- 160 --> <option value="pap" lang="pap">Papiamentu (Papiamento)</option>
    <!-- 161 --> <option value="pcd" lang="pcd">Picard (Picard)</option>
    <!-- 162 --> <option value="pl" lang="pl">Polski (Polish)</option>
    <!-- 163 --> <option value="pms" lang="pms">Piemontèis (Piedmontese)</option>
    <!-- 164 --> <option value="pnb" lang="pnb">پنجابی (Western Punjabi)</option>
    <!-- 165 --> <option value="ps" lang="ps">پښتو (Pashto)</option>
    <!-- 166 --> <option value="pt" lang="pt">Português (Portuguese)</option>
    <!-- 167 --> <option value="qu" lang="qu">Runa Simi (Quechua)</option>
    <!-- 168 --> <option value="rki" lang="rki">ရခိုင် (Arakanese)</option>
    <!-- 169 --> <option value="ro" lang="ro">Română (Romanian)</option>
    <!-- 170 --> <option value="roa-rup" lang="roa-rup">Armãneashti (Aromanian)</option>
    <!-- 171 --> <option value="ru" lang="ru">Русский (Russian)</option>
    <!-- 172 --> <option value="rue" lang="rue">Русиньскый (Rusyn)</option>
    <!-- 173 --> <option value="sa" lang="sa">संस्कृतम् (Sanskrit)</option>
    <!-- 174 --> <option value="sah" lang="sah">Саха тыла (Yakut)</option>
    <!-- 175 --> <option value="sat" lang="sat">ᱥᱟᱱᱛᱟᱲᱤ (Santali)</option>
    <!-- 176 --> <option value="sc" lang="sc">Sardu (Sardinian)</option>
    <!-- 177 --> <option value="scn" lang="scn">Sicilianu (Sicilian)</option>
    <!-- 178 --> <option value="sco" lang="sco">Scots (Scots)</option>
    <!-- 179 --> <option value="sd" lang="sd">سنڌي (Sindhi)</option>
    <!-- 180 --> <option value="se" lang="se">Davvisámegiella (Northern Sami)</option>
    <!-- 181 --> <option value="sh" lang="sh">Srpskohrvatski / српскохрватски (Serbo-Croatian)</option>
    <!-- 182 --> <option value="shi" lang="shi">Taclḥit (Tachelhit)</option>
    <!-- 183 --> <option value="shn" lang="shn">တႆး (Shan)</option>
    <!-- 184 --> <option value="si" lang="si">සිංහල (Sinhala)</option>
    <!-- 185 --> <option value="simple" lang="simple">Simple English (Simple English)</option>
    <!-- 186 --> <option value="sk" lang="sk">Slovenčina (Slovak)</option>
    <!-- 187 --> <option value="skr" lang="skr">سرائیکی (Saraiki)</option>
    <!-- 188 --> <option value="sl" lang="sl">Slovenščina (Slovenian)</option>
    <!-- 189 --> <option value="sn" lang="sn">ChiShona (Shona)</option>
    <!-- 190 --> <option value="sq" lang="sq">Shqip (Albanian)</option>
    <!-- 191 --> <option value="sr" lang="sr">Српски / srpski (Serbian)</option>
    <!-- 192 --> <option value="su" lang="su">Sunda (Sundanese)</option>
    <!-- 193 --> <option value="sv" lang="sv">Svenska (Swedish)</option>
    <!-- 194 --> <option value="sw" lang="sw">Kiswahili (Swahili)</option>
    <!-- 195 --> <option value="szl" lang="szl">Ślůnski (Silesian)</option>
    <!-- 196 --> <option value="szy" lang="szy">Sakizaya (Sakizaya)</option>
    <!-- 197 --> <option value="ta" lang="ta">தமிழ் (Tamil)</option>
    <!-- 198 --> <option value="tcy" lang="tcy">ತುಳು (Tulu)</option>
    <!-- 199 --> <option value="te" lang="te">తెలుగు (Telugu)</option>
    <!-- 200 --> <option value="tg" lang="tg">Тоҷикӣ (Tajik)</option>
    <!-- 201 --> <option value="th" lang="th">ไทย (Thai)</option>
    <!-- 202 --> <option value="tk" lang="tk">Türkmençe (Turkmen)</option>
    <!-- 203 --> <option value="tl" lang="tl">Tagalog (Tagalog)</option>
    <!-- 204 --> <option value="tly" lang="tly">Tolışi (Talysh)</option>
    <!-- 205 --> <option value="tok" lang="tok">Toki pona (Toki Pona)</option>
    <!-- 206 --> <option value="tpi" lang="tpi">Tok Pisin (Tok Pisin)</option>
    <!-- 207 --> <option value="tr" lang="tr">Türkçe (Turkish)</option>
    <!-- 208 --> <option value="tt" lang="tt">Татарча / tatarça (Tatar)</option>
    <!-- 209 --> <option value="tum" lang="tum">ChiTumbuka (Tumbuka)</option>
    <!-- 210 --> <option value="udm" lang="udm">Удмурт (Udmurt)</option>
    <!-- 211 --> <option value="uk" lang="uk">Українська (Ukrainian)</option>
    <!-- 212 --> <option value="ur" lang="ur">اردو (Urdu)</option>
    <!-- 213 --> <option value="uz" lang="uz">Oʻzbekcha / ўзбекча (Uzbek)</option>
    <!-- 214 --> <option value="vec" lang="vec">Vèneto (Venetian)</option>
    <!-- 215 --> <option value="vep" lang="vep">Vepsän kel’ (Veps)</option>
    <!-- 216 --> <option value="vi" lang="vi">Tiếng Việt (Vietnamese)</option>
    <!-- 217 --> <option value="vls" lang="vls">West-Vlams (West Flemish)</option>
    <!-- 218 --> <option value="vo" lang="vo">Volapük (Volapük)</option>
    <!-- 219 --> <option value="wa" lang="wa">Walon (Walloon)</option>
    <!-- 220 --> <option value="war" lang="war">Winaray (Waray)</option>
    <!-- 221 --> <option value="wuu" lang="wuu">吴语 (Wu)</option>
    <!-- 222 --> <option value="xh" lang="xh">IsiXhosa (Xhosa)</option>
    <!-- 223 --> <option value="xmf" lang="xmf">მარგალური (Mingrelian)</option>
    <!-- 224 --> <option value="yi" lang="yi">ייִדיש (Yiddish)</option>
    <!-- 225 --> <option value="yo" lang="yo">Yorùbá (Yoruba)</option>
    <!-- 226 --> <option value="zea" lang="zea">Zeêuws (Zeelandic)</option>
    <!-- 227 --> <option value="zgh" lang="zgh">ⵜⴰⵎⴰⵣⵉⵖⵜ ⵜⴰⵏⴰⵡⴰⵢⵜ (Standard Moroccan Tamazight)</option>
    <!-- 228 --> <option value="zh-classical" lang="zh-classical">文言 (Literary Chinese)</option>
    <!-- 229 --> <option value="zh-min-nan" lang="zh-min-nan">閩南語 / Bân-lâm-gí (Minnan)</option>
    <!-- 230 --> <option value="zh-yue" lang="zh-yue">粵語 (Cantonese)</option>
    <!-- 231 --> <option value="zh" lang="zh">中文 (Chinese)</option>
    <!-- 232 --> <option value="zu" lang="zu">IsiZulu (Zulu)</option>
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