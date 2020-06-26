$(function(){
  /**
   * functionExe
   * 関数実行
   */
  function functionExe() {
    generateWorksSection();   // worksセクションの生成
    generateSkillSection();   // skillセクションの生成
    smoothScroll();           // スムーススクロール
    scrollAnimation();        // スクロールアニメーション
    slideToggle();            // スライドトグル
    controlSpMenu();          // SP用メニューの制御
  }


  /**
   * smoothScroll
   * スムーススクロール
   */
  function smoothScroll() {
    var speed = 400; // スクロール速度
    $('a[href^="#"]').on('click', function() {
      var href = $(this).attr('href');
      var target = $(href == '#' || href == '' ? 'html' : href);
      var targetPos = target.offset().top;
      // var position = targetPos - 80;
      $('body,html').animate({scrollTop: (targetPos - 80) }, speed, 'swing');
      return false;
    });
  }

  /**
   * scrollAnimation
   * スクロールアニメーション
   */
  function scrollAnimation() {
    var triggerPos = 530;
    var $target = $('.js_scrollAnimation');
    if ($target.length <= 0) {
      return false;
    }
    // ページ読み込み時
    addAnimationClass($target, $(window).scrollTop(), triggerPos);
    // スクロール時
    $(window).scroll(function () {
      addAnimationClass($target, $(this).scrollTop(), triggerPos);
    });
  }

  /**
   * addAnimationClass
   * アニメーションクラス付与
   * @param {jQueryObj} $target 対象のjqueryオブジェクト
   * @param {number} currentPos 現在のスクロール位置
   * @param {number} triggerPos アニメーションクラス付与位置（px）
   */
  function addAnimationClass($target, currentPos, triggerPos) {
    $target.each(function() {
      var $this = $(this);
      if (!($this.hasClass('is_show'))) {
        var targetPos = $this.offset().top;
        var addClassPos = targetPos - triggerPos;
        if (currentPos > addClassPos) {
          $this.addClass('is_show');
        }
      }
    });
  }

  /**
   * slideToggle
   * スライドトグル
   */
  function slideToggle() {
    var $clickTarget = $('.js_accordion');
    var slideTargetNm = '.js_accordion_openContent';
    var activeClassNm = 'is_open';
    $clickTarget.on('click', function() {
      var $this = $(this);
      $this.find(slideTargetNm).stop().slideToggle();
      if ($this.hasClass(activeClassNm)) {
        $this.removeClass(activeClassNm);
      } else {
        $this.addClass(activeClassNm);
      }
    });
  }

  /**
   * generateWorksSection
   * worksセクションの生成
   */
  function generateWorksSection() {
    var worksData = setWorksData();
    renderTemplate('#works_cont', '#worksTemplate', {"worksData": worksData});
    controlModal();
  }

  /**
   * controlModal
   * モーダルウィンドウの制御
   */
  function controlModal() {
    $('.js_modal').on('click', function() {
      var index = $(this).index();
      $('.js_modal_openContent').eq(index).fadeIn();
      $('body').addClass('is_fixed');
    });
    $('.js_modal_close').on('click', function() {
      $(this).parents('.js_modal_openContent').fadeOut();
      $('body').removeClass('is_fixed');
    });
  }

  /**
   * generateSkillSection
   * skillセクションの生成
   */
  function generateSkillSection() {
    var skillData = setSkillData();
    renderTemplate('#skill_list', '#skillTemplate', {"skillData": skillData});
    $('.skill_item').each(function(i) {
      var $boxInner = $(this).find('.skill_skillset_boxInner');
      $boxInner.each(function(j) {
        $(this).css('width', skillData[i].skills[j].percent + '%');
      });
    });
  }

  /**
   * renderTemplate
   * テンプレートの描画
   * @param {string} rootElNm ルート要素名
   * @param {string} templateElNm テンプレート要素名
   * @param {object} data テンプレートに渡すデータ
   */
  function renderTemplate(rootElNm, templateElNm, data) {
    var template = $(templateElNm).html();
    var compiled = _.template(template);
    $(rootElNm).html(compiled(data));
  }

  /**
   * controlSpMenu
   * SP用メニューの制御
   */
  function controlSpMenu() {
    let $navBtn = $('.nav_navBtn');
    let $navList = $('.nav_list');
    let $navBg = $('.nav_bg');
    let activeClassNm = 'is_open';
    $navBtn.on('click', function() {
      if($navBtn.hasClass(activeClassNm)) {
        removeClass();
      } else {
        $navBtn.addClass(activeClassNm);
        $navList.addClass(activeClassNm);
        $navBg.addClass(activeClassNm);
      }
    });
    $('a').on('click', function() {
      removeClass();
    });
    $navBg.on('click', function() {
      removeClass();
    });
    function removeClass() {
      $navBtn.removeClass(activeClassNm);
      $navList.removeClass(activeClassNm);
      $navBg.removeClass(activeClassNm);
    }
  }

  /**
   * setWorksData
   * worksデータの設定
   */
  function setWorksData() {
    var data = [
      {
        "title": "ポートフォリオ",
        "description": "自分自身のポートフォリオサイトです。",
        "imgSrc_pc": "./img/works_portfolio_pc.png",
        "imgSrc_sp": "./img/works_portfolio_sp.png",
        "when": "2020.6",
        "using": "HTML5/CSS3/jQuery/Underscore.js",
        "inCharge": "デザイン/実装全般",
        "period": "約3週間",
        "comment": "リスト形式で繰り返しデータを表示させる部分（worksとskill）をUnderscore.jsのテンプレート機能を使ってテンプレート化しました。<br>"
                   + "サイト内で使用している写真は自分で撮影しています（自己紹介部分を除く）。",
        "url": "",
        "github": "",
        "screenshot_pc": ["./img/works_screenshot_portfolio_pc_01.png", "./img/works_screenshot_portfolio_pc_02.png"],
        "screenshot_sp": ["./img/works_screenshot_portfolio_sp_01.png", "./img/works_screenshot_portfolio_sp_02.png", "./img/works_screenshot_portfolio_sp_03.png", "./img/works_screenshot_portfolio_sp_04.png"]
      },
      {
        "title": "MinatoAquarium",
        "description": "コーディング練習用仮想サイトです。",
        "imgSrc_pc": "./img/works_minatoAqurium_pc.png",
        "imgSrc_sp": "./img/works_minatoAqurium_sp.png",
        "when": "2020.5",
        "using": "HTML5/CSS3/jQuery",
        "inCharge": "デザイン/実装全般",
        "period": "約3週間",
        "comment": "営業スケジュールカレンダーをjQueryで自作しています。<br>個別のcsvファイルに休館日を書き込んで保存すると画面上のカレンダーに反映されます。Ajax通信を用いて実装。",
        "url": "https://i-89.net/member/saito_shiori/MinatoAquarium/",
        "github": "https://github.com/SaitoShiori/practice_MinatoAquarium",
        "screenshot_pc": ["./img/works_screenshot_minatoAquarium_pc_01.png", "./img/works_screenshot_minatoAquarium_pc_02.png"],
        "screenshot_sp": ["./img/works_screenshot_minatoAquarium_sp_01.png", "./img/works_screenshot_minatoAquarium_sp_02.png", "./img/works_screenshot_minatoAquarium_sp_03.png", "./img/works_screenshot_minatoAquarium_sp_04.png"]
      },
      {
        "title": "金融系計算システム開発",
        "description": "客先に常駐し、計算システムの開発を行いました。",
        "imgSrc_pc": "",
        "imgSrc_sp": "",
        "when": "2019.7 ~ 2019.12",
        "using": "java/Spring Boot/バッチスクリプト",
        "inCharge": "基本設計/詳細設計/java実装/bat実装",
        "period": "5ヶ月",
        "comment": "社内業務に用いられている計算システムの統合化案件。上流工程の段階から参加し、最終的な実装も担当しました。<br>javaではREST通信まわりを、バッチスクリプトでは定期実行されるログバックアップバッチ等を実装しました。",
        "url": "",
        "github": "",
        "screenshot_pc": [],
        "screenshot_sp": []
      },
      {
        "title": "NaLacy",
        "description": "社内研修でのチーム制作サイトです。<br>一部コーディングとアニメーション全般の実装を担当しました。",
        "imgSrc_pc": "./img/works_nalacy_pc.png",
        "imgSrc_sp": "./img/works_nalacy_sp.png",
        "when": "2018.8 ~ 2018.9",
        "using": "HTML5/CSS3/jQuery",
        "inCharge": "HTMLコーディング/アニメーション実装",
        "period": "約1ヶ月半",
        "comment": "プラグインを使わずに画像スライドアニメーションを実装しました（「NEWS」部分）。",
        "url": "",
        "github": "",
        "screenshot_pc": ["./img/works_screenshot_nalacy_pc_01.png", "./img/works_screenshot_nalacy_pc_02.png"],
        "screenshot_sp": ["./img/works_screenshot_nalacy_sp_01.png", "./img/works_screenshot_nalacy_sp_02.png", "./img/works_screenshot_nalacy_sp_03.png"],
      },
      {
        "title": "金融系社内システム開発",
        "description": "客先に常駐し、社内システムの開発を行いました。",
        "imgSrc_pc": "",
        "imgSrc_sp": "",
        "when": "2018.7 ~ 2019.6",
        "using": "html5/css3/jquery/jQuery UI/jqGrid/backbone.js/underscore.js/bootstrap",
        "inCharge": "フロントエンド実装",
        "period": "1年",
        "comment": "社内システムのフロントエンドまわりの実装を担当しました。画面の実装、画面に入力されたデータの取得、取得したデータの送信が主な内容です。backbone.jsを使うことでMVCモデルの概念を学びました。",
        "url": "",
        "github": "",
        "screenshot_pc": [],
        "screenshot_sp": []
      },
      {
        "title": "チョコフェス2017",
        "description": "社内研修でのチーム制作サイトです。<br>一部コーディングとアニメーション全般の実装を担当しました。",
        "imgSrc_pc": "./img/works_chocoFes_pc.png",
        "imgSrc_sp": "./img/works_chocoFes_sp.png",
        "when": "2018.2 ~ 2018.4",
        "using": "HTML5/CSS3/jQuery/TweenMax",
        "inCharge": "HTMLコーディング/アニメーション実装",
        "period": "約2ヶ月",
        "comment": "PMとしてスケジュール調整等をしながらチームメンバーへのタスク振りを行いました。<br>スクロールアニメーションには「TweenMax」ライブラリを使用しています。",
        "url": "https://i-89.net/member/saito_shiori/chocofes_saito/",
        "github": "",
        "screenshot_pc": ["./img/works_screenshot_chocoFes_pc_01.png", "./img/works_screenshot_chocoFes_pc_02.png", "./img/works_screenshot_chocoFes_pc_03.png", "./img/works_screenshot_chocoFes_pc_04.png"],
        "screenshot_sp": ["./img/works_screenshot_chocoFes_sp_01.png", "./img/works_screenshot_chocoFes_sp_02.png", "./img/works_screenshot_chocoFes_sp_03.png", "./img/works_screenshot_chocoFes_sp_04.png"]
      },
      {
        "title": "就活サイト運用",
        "description": "客先に常駐し、就活サイトの運用を行いました。",
        "imgSrc_pc": "",
        "imgSrc_sp": "",
        "when": "2017.9 ~ 2018.6",
        "using": "html5/css3/jquery/underscore.js/photoshop/ejs",
        "inCharge": "新規ページコーディング、既存ページ更新、外部サイトの記事流し込み(wordpress)、MV作成",
        "period": "10ヶ月",
        "comment": "コーディングではjQueryを用いてタブ切り替え等の動きのあるページを実装しました。ページの量産の際はgulpを使用し、記載データのチェック等も担当しました。",
        "url": "",
        "github": "",
        "screenshot_pc": [],
        "screenshot_sp": []
      },
      {
        "title": "コーポレートサイト全面リニューアル",
        "description": "客先に常駐し、コーポレートサイトの全面リニューアル業務を行いました。",
        "imgSrc_pc": "",
        "imgSrc_sp": "",
        "when": "2017.6 ~ 2018.9",
        "using": "pug/scss/Bootstrap/gulp",
        "inCharge": "ニュースページのリニューアル作業、URL修正等",
        "period": "3ヶ月",
        "comment": "ニュースページのリニューアル作業を主に担当しました。他にも、チェッカーから依頼のあった箇所の修正等。数千ページある大規模サイトのリニューアルでした。",
        "url": "",
        "github": "",
        "screenshot_pc": [],
        "screenshot_sp": []
      }
    ];
    return data;
  }

  /**
   * setSkillData
   * スキルデータの設定
   */
  function setSkillData() {
    var data = [
      {
        "title": "プログラミング言語",
        "classNm":"language",
        "skills": [
          { 
            "category": "HTML5/CSS3",
            "experienceYears": "3years",
            "percent": 90
          },
          {
            "category": "JavaScript",
            "experienceYears": "3years",
            "percent": 80
          },
          {
            "category": "Sass",
            "experienceYears": "4months",
            "percent": 60
          },
          {
            "category": "Java",
            "experienceYears": "3months",
            "percent": 40
          }
        ]
      },
      {
        "title": 'フレームワーク, ライブラリ, <br class="disp_sp">テンプレートエンジン',
        "classNm":"framework",
        "skills": [
          { 
            "category": "jQuey",
            "experienceYears": "3years",
            "percent": 90
          },
          {
            "category": "Bootstrap",
            "experienceYears": "5months",
            "percent": 70
          },
          {
            "category": "Backbone.js",
            "experienceYears": "8months",
            "percent": 60
          },
          {
            "category": "Underscore.js",
            "experienceYears": "1years",
            "percent": 70
          },
          {
            "category": "pug",
            "experienceYears": "2months",
            "percent": 30
          },
          {
            "category": "ejs",
            "experienceYears": "6months",
            "percent": 60
          }
        ]
      },
      {
        "title": "その他・ツール等",
        "classNm":"tool",
        "skills": [
          { 
            "category": "Git",
            "experienceYears": "2years",
            "percent": 70
          },
          {
            "category": "SVN",
            "experienceYears": "1years",
            "percent": 60
          },
          {
            "category": "Sourcetree",
            "experienceYears": "2years",
            "percent": 70
          }
        ]
      }
    ];
    return data;
  }



  // 実行
  functionExe();
});