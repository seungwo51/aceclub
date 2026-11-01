/* ACE CLUB SEOUL — 다국어 전환 (ko 기본 / en · ja · zh · th)
   상단 국기 버튼 클릭 시 페이지 텍스트·이미지 대체텍스트·aria-label을 해당 언어로 바꿉니다.
   선택된 국기를 다시 누르면 한국어 원문으로 돌아갑니다.
   본문 한국어 문구를 수정하면 아래 사전의 키(한국어 원문)도 같이 수정해야 번역이 적용됩니다. */
(function(){
  'use strict';

  var L = ['en','ja','zh','th'];
  var HTML_LANG = {ko:'ko-KR', en:'en', ja:'ja', zh:'zh-CN', th:'th'};

  /* [한국어 원문, en, ja, zh, th] — 빈 문자열이면 원문 유지 */
  var T = [
    /* 문서 제목 */
    ['에이스 클럽 | 클럽 에이스 강남클럽 공식 예약 안내',
     'ACE CLUB | Gangnam Club ACE Official Reservation Guide',
     'ACE CLUB | 江南クラブ ACE 公式予約案内',
     'ACE CLUB | 江南夜店 ACE 官方预订指南',
     'ACE CLUB | คู่มือจองอย่างเป็นทางการ คลับ ACE กังนัม'],

    /* 상단 메뉴 */
    ['PEOPLE','','ピープル','现场','บรรยากาศ'],
    ['PRICE','','料金','价格','ราคา'],
    ['MAP','','マップ','座位图','แผนผัง'],
    ['OPEN','','営業','营业','เวลาเปิด'],
    ['LOCATION','','アクセス','位置','ที่ตั้ง'],
    ['QNA','','Q&A','问答','ถาม-ตอบ'],

    /* 히어로 */
    ['서울시 서초구 강남대로 597에 있는',
     'Located at 597 Gangnam-daero, Seocho-gu, Seoul —',
     'ソウル市瑞草区江南大路597にある',
     '位于首尔市瑞草区江南大路597号的',
     'ตั้งอยู่ที่ 597 Gangnam-daero, Seocho-gu, Seoul'],
    ['전 레이스 현 에이스 클럽 공식 사이트 입니다.',
     'the official site of ACE CLUB (formerly RACE).',
     '旧RACE・現ACE CLUBの公式サイトです。',
     '原RACE、现ACE CLUB官方网站。',
     'เว็บไซต์ทางการของ ACE CLUB (เดิมชื่อ RACE)'],
    ['하루 유동인구 1000명+','1,000+ visitors a day','1日の来場者 1,000人以上','日均客流 1000人以上','ผู้มาเยือน 1,000+ คนต่อวัน'],
    ['실시간 예약제 도입','Real-time reservations','リアルタイム予約制','实时预订制','ระบบจองแบบเรียลไทม์'],
    ['365일 매일 오픈','Open 365 days a year','365日毎日営業','全年365天营业','เปิดทุกวัน 365 วัน'],
    ['@park_ace_club 바로가기','Go to @park_ace_club','@park_ace_club はこちら','前往 @park_ace_club','ไปที่ @park_ace_club'],
    ['강남 클럽 순위','Gangnam Club Ranking','江南クラブ ランキング','江南夜店排名','อันดับคลับกังนัม'],
    ['2026 운영 기준 순위·장단점','2026 rankings · pros & cons','2026年 営業基準ランキング・長所短所','2026营业排名·优缺点','อันดับปี 2026 · ข้อดีข้อเสีย'],
    ['강남 클럽 추천','Gangnam Club Picks','江南クラブ おすすめ','江南夜店推荐','คลับกังนัมแนะนำ'],
    ['방문 기준·분위기 정리','Visit tips · atmosphere','訪問ポイント・雰囲気','到访要点·氛围','เกณฑ์การไป · บรรยากาศ'],
    ['강남 클럽 게스트','Gangnam Club Guest','江南クラブ ゲスト','江南夜店嘉宾入场','เกสต์คลับกังนัม'],
    ['무료입장·입뺀 기준','Free entry · refusal rules','無料入場・入場拒否の基準','免费入场·拒绝入场标准','เข้าฟรี · เกณฑ์ปฏิเสธเข้า'],
    ['강남 클럽 테이블','Gangnam Club Tables','江南クラブ テーブル','江南夜店卡座','โต๊ะคลับกังนัม'],
    ['가격·비용·예약 팁','Prices · costs · booking tips','料金・費用・予約のコツ','价格·费用·预订技巧','ราคา · ค่าใช้จ่าย · เคล็ดลับจอง'],
    ['레이스폐업·에이스','RACE closure · ACE','RACE閉店・ACE','RACE停业·ACE','RACE ปิดตัว · ACE'],
    ['리뉴얼 흐름 정리','Renewal story','リニューアルの経緯','翻新经过','เรื่องราวการรีโนเวท'],
    ['강남 클럽 입뺀','Gangnam Club Entry Refusal','江南クラブ 入場拒否','江南夜店拒绝入场','การปฏิเสธเข้าคลับกังนัม'],
    ['입뺀 이유·방지 방법','Reasons · how to avoid','理由・防ぐ方法','原因·预防方法','สาเหตุ · วิธีป้องกัน'],
    ['강남 클럽 후기','Gangnam Club Reviews','江南クラブ 口コミ','江南夜店评价','รีวิวคลับกังนัม'],
    ['혼잡도·실지출 후기','Crowds · actual spending','混雑度・実際の出費','拥挤程度·实际花费','ความหนาแน่น · ค่าใช้จ่ายจริง'],

    /* 할로윈 */
    ['할로윈 조판 가이드','Halloween Table Booking Guide','ハロウィン テーブル予約ガイド','万圣节订台指南','คู่มือจองโต๊ะฮาโลวีน'],
    ['할로윈주 테이블 가이드 안내🎆','Halloween week table guide 🎆','ハロウィン週 テーブルガイド🎆','万圣节周卡座指南🎆','คู่มือโต๊ะสัปดาห์ฮาโลวีน 🎆'],
    ['상세 가격, 가이드, 조각, 올레이디 문의는',
     'For detailed prices, guides, table shares and all-ladies tables,',
     '詳しい料金・ガイド・相席・女性のみのお問い合わせは',
     '详细价格、指南、拼桌、全女生卡座咨询',
     'สอบถามราคา คู่มือ แชร์โต๊ะ และโต๊ะผู้หญิงล้วน'],
    ['하단 문자 또는 카카오톡으로 부탁드립니다.',
     'please contact us via the SMS or KakaoTalk buttons below.',
     '下のSMSまたはカカオトークからお願いします。',
     '请通过下方短信或KakaoTalk联系。',
     'ได้ทาง SMS หรือ KakaoTalk ด้านล่าง'],
    ['* 선조판 다음날 24:00 까지 50%',
     '* Advance booking: 50% by 24:00 the next day',
     '※事前予約は翌日24:00までに50%',
     '* 预订后次日24:00前支付50%',
     '* จองล่วงหน้า ชำระ 50% ภายใน 24:00 ของวันถัดไป'],
    ['선입 , 미입된 자리 캔슬 후 재조판형식',
     'Prepayment first — unpaid seats are cancelled and re-booked.',
     '先入金制、未入金の席はキャンセル後に再予約となります。',
     '先付款制，未付款座位将取消后重新安排。',
     'ชำระก่อน ที่นั่งที่ยังไม่ชำระจะถูกยกเลิกและจัดใหม่'],

    /* People */
    ['People & Mood','','ピープル & ムード','现场 & 氛围','ผู้คน & บรรยากาศ'],
    ['아래 사진들은 2026.05 기준으로 촬영된 클럽 에이스의 플로어, DJ 부스, 테이블, 스테이지 분위기와 인파 현황 입니다. 금요일과 토요일과 같은 주말 기준으로 하루 평균 약 1천명 내외로 입장하며, 평일은 그보다는 좀 낮은 500명 ~ 700명 사이로 입장합니다.',
     'The photos below were taken in May 2026 and show the floor, DJ booth, tables, stage atmosphere and crowd at Club ACE. On weekends such as Friday and Saturday, about 1,000 people enter per day on average; on weekdays it is somewhat lower, between 500 and 700.',
     '下の写真は2026年5月時点で撮影したクラブACEのフロア、DJブース、テーブル、ステージの雰囲気と混雑状況です。金曜・土曜などの週末は1日平均約1,000人前後、平日はやや少なく500〜700人ほどが入場します。',
     '以下照片拍摄于2026年5月，展示了ACE夜店的舞池、DJ台、卡座、舞台氛围和人流情况。周五、周六等周末日均入场约1000人左右，平日略少，约500~700人。',
     'ภาพด้านล่างถ่ายเมื่อเดือนพฤษภาคม 2026 แสดงฟลอร์ บูธ DJ โต๊ะ บรรยากาศเวที และจำนวนผู้คนของคลับ ACE ช่วงสุดสัปดาห์อย่างวันศุกร์และเสาร์มีผู้เข้าเฉลี่ยประมาณ 1,000 คนต่อวัน ส่วนวันธรรมดาน้อยกว่าเล็กน้อย ราว 500–700 คน'],
    ['입장 기준 안내','Entry rules','入場基準のご案内','入场标准','เกณฑ์การเข้า'],
    ['입뺀 기준은 쪼리, 슬리퍼, 크록스, 추리닝 등이 있으며, 현장 가드 판단에 따라 달라질 수 있습니다.',
     'Flip-flops, slippers, Crocs and tracksuits may be refused entry, and decisions may vary at the door guard’s discretion.',
     'ビーチサンダル、スリッパ、クロックス、ジャージなどは入場拒否の対象となり、現場のガードの判断により異なる場合があります。',
     '人字拖、拖鞋、洞洞鞋、运动服等可能被拒绝入场，具体以现场保安判断为准。',
     'รองเท้าแตะคีบ รองเท้าแตะ Crocs และชุดวอร์มอาจถูกปฏิเสธการเข้า ทั้งนี้ขึ้นอยู่กับการตัดสินของการ์ดหน้างาน'],

    /* Menu */
    ['Menu & Price','','メニュー & 料金','菜单 & 价格','เมนู & ราคา'],
    ['에이스 클럽의 주류와 가격구성 메뉴판 사진을 안내합니다. 전광판, 사진, 샴걸, 연출곡 등 요소는 메뉴판 사진 밑에 있는 가이드에 따라 달라질 수 있으며, 리큐르와 샴페인 또는 데킬라와 샴페인으로 혼합하여 주류를 구성하여 클러빙 하시는 것을 추천드립니다.',
     'Here are ACE CLUB’s drink menu and price photos. LED screen, photo, champagne girls, effect songs and other elements may vary according to the guide below the menu photos. We recommend combining liqueur with champagne, or tequila with champagne, for your night.',
     'ACE CLUBのお酒と料金構成のメニュー写真です。電光掲示板、写真、シャンパンガール、演出曲などはメニュー写真下のガイドにより異なる場合があります。リキュールとシャンパン、またはテキーラとシャンパンを組み合わせてのクラビングをおすすめします。',
     '以下为ACE CLUB酒水与价格菜单照片。电子屏、照片、香槟女郎、演出曲目等项目以菜单照片下方的指南为准，建议以利口酒+香槟或龙舌兰+香槟的组合来点酒。',
     'นี่คือภาพเมนูเครื่องดื่มและราคาของ ACE CLUB องค์ประกอบอย่างจอ LED ภาพถ่าย แชมเปญเกิร์ล และเพลงประกอบอาจแตกต่างกันตามคู่มือใต้ภาพเมนู เราแนะนำให้สั่งลิเคียวร์คู่กับแชมเปญ หรือเตกีล่าคู่กับแชมเปญ'],
    ['메뉴 및 가격 1','Menu & price 1','メニュー・料金 1','菜单及价格 1','เมนูและราคา 1'],
    ['메뉴 및 가격 2','Menu & price 2','メニュー・料金 2','菜单及价格 2','เมนูและราคา 2'],
    ['메뉴 및 가격 3','Menu & price 3','メニュー・料金 3','菜单及价格 3','เมนูและราคา 3'],
    ['전용전광','Dedicated LED screen','専用電光掲示','专属电子屏','จอ LED เฉพาะ'],
    ['누적','Cumulative','累計','累计','ยอดสะสม'],
    ['8천부터','from 8,000','8千から','8千起','ตั้งแต่ 8,000'],
    ['세팅곡 / 전광사진','Set song / LED photo','セッティング曲 / 電光写真','指定歌曲 / 电子屏照片','เพลงเซ็ต / ภาพบนจอ LED'],
    ['주말 초도','Weekend first order','週末 初回','周末首单','สุดสัปดาห์ ออเดอร์แรก'],
    ['· 평일 초도','· Weekday first order','· 平日 初回','· 平日首单','· วันธรรมดา ออเดอร์แรก'],
    ['알파벳','Alphabet','アルファベット','字母','ตัวอักษร'],
    ['주말','Weekend','週末','周末','สุดสัปดาห์'],
    ['· 평일','· Weekday','· 平日','· 平日','· วันธรรมดา'],
    ['홀로그램','Hologram','ホログラム','全息投影','โฮโลแกรม'],
    ['주말 200당 1개 · 평일 150당 1개. 최대 3개 기준.',
     '1 per 200 on weekends · 1 per 150 on weekdays. Up to 3.',
     '週末200ごとに1個 · 平日150ごとに1個。最大3個まで。',
     '周末每200赠1个 · 平日每150赠1个，最多3个。',
     'สุดสัปดาห์ 1 ชิ้นต่อ 200 · วันธรรมดา 1 ชิ้นต่อ 150 สูงสุด 3 ชิ้น'],
    ['피켓 기준','Picket rules','ピケットの基準','手举牌标准','เกณฑ์ป้ายพิคเก็ต'],
    ['알/돔/파/바/진 고액술 1병 가능',
     'Premium bottles (알/돔/파/바/진): 1 bottle',
     '高級酒(알/돔/파/바/진)1本から可能',
     '高价酒(알/돔/파/바/진) 1瓶即可',
     'เหล้าพรีเมียม (알/돔/파/바/진) 1 ขวด'],
    ['일반샴 피켓: 주말 3병 · 평일 2병 이상',
     'Regular champagne picket: 3+ bottles weekends · 2+ weekdays',
     '一般シャンパンのピケット：週末3本・平日2本以上',
     '普通香槟手举牌：周末3瓶·平日2瓶以上',
     'พิคเก็ตแชมเปญทั่วไป: สุดสัปดาห์ 3 ขวด · วันธรรมดา 2 ขวดขึ้นไป'],
    ['레이스 피켓: 2병 이상','RACE picket: 2+ bottles','RACEピケット：2本以上','RACE手举牌：2瓶以上','พิคเก็ต RACE: 2 ขวดขึ้นไป'],
    ['국기: 주말 200 · 평일 100 이상','National flag: 200+ weekends · 100+ weekdays','国旗：週末200・平日100以上','国旗：周末200·平日100以上','ธงชาติ: สุดสัปดาห์ 200 · วันธรรมดา 100 ขึ้นไป'],
    ['예약 확인','Reservation check','予約確認','预订确认','ตรวจสอบการจอง'],
    ['메뉴, 좌석, 연출은 예약 상황에 따라 달라질 수 있으므로',
     'Menu, seating and effects may change depending on reservations, so the most accurate way is to check with',
     'メニュー・席・演出は予約状況により変わる場合があるため、',
     '菜单、座位和演出可能因预订情况而变动，最准确的方式是通过短信或KakaoTalk向',
     'เมนู ที่นั่ง และการแสดงอาจเปลี่ยนตามสถานะการจอง วิธีที่แม่นยำที่สุดคือสอบถาม'],
    ['박병규','Park Byeong-gyu','パク・ビョンギュ','Park Byeong-gyu (박병규)','ปาร์ค บย็องกยู'],
    ['에게 문자 또는 카톡으로 확인하는 방식이 가장 정확합니다.',
     ' via SMS or KakaoTalk.',
     'にSMSまたはカカオトークで確認するのが最も確実です。',
     '确认。',
     ' ทาง SMS หรือ KakaoTalk'],
    ['표기 금액과 연출 기준은 안내용입니다. 현장 사정, 요일, 이벤트, 재고, 예약 구역에 따라 달라질 수 있습니다.',
     'Listed prices and effect rules are for reference only and may vary with on-site conditions, day of the week, events, stock and reserved zone.',
     '表記の金額と演出基準はご案内用です。現場の状況・曜日・イベント・在庫・予約エリアにより異なる場合があります。',
     '所示金额和演出标准仅供参考，可能因现场情况、星期、活动、库存及预订区域而有所不同。',
     'ราคาและเกณฑ์การแสดงที่ระบุเป็นเพียงข้อมูลอ้างอิง อาจเปลี่ยนแปลงตามสถานการณ์หน้างาน วัน อีเวนต์ สต็อก และโซนที่จอง'],

    /* DJ */
    ['DJ Line-up','','DJラインナップ','DJ阵容','ไลน์อัพ DJ'],
    ['금일 DJ라인업(타임테이블)입니다. 일정은 현장 운영, 이벤트, DJ 사정에 따라 일부 조정될 수 있으며, 특별한 이벤트가 있다면 별도로 공지하고 있습니다.',
     'Today’s DJ line-up (timetable). The schedule may be partly adjusted depending on venue operations, events or DJ circumstances, and special events are announced separately.',
     '本日のDJラインナップ(タイムテーブル)です。スケジュールは現場運営・イベント・DJの都合により一部変更される場合があり、特別なイベントは別途お知らせしています。',
     '今日DJ阵容(时间表)。日程可能因现场运营、活动或DJ情况略有调整，如有特别活动将另行公告。',
     'ไลน์อัพ DJ (ตารางเวลา) ของวันนี้ ตารางอาจมีการปรับเปลี่ยนบางส่วนตามการดำเนินงาน อีเวนต์ หรือสถานการณ์ของ DJ หากมีอีเวนต์พิเศษจะแจ้งแยกต่างหาก'],

    /* Floor */
    ['Floor Map','','フロアマップ','场地平面图','ผังพื้นที่'],
    ['에이스 클럽의 자리 및 배치도를 안내합니다. 자리별 예상 가격은 해당 사진 아래에 상세히 구분되어 있으며, 올레이디·인플루언서·생일·신년·크리스마스 등 각종 이벤트에 따라 가격이 조정될 수 있으므로 하단 카카오톡 또는 문자 문의를 통해 매니저에게 안내받으시길 바랍니다.',
     'This is ACE CLUB’s seating and floor layout. Estimated prices per seat are detailed below the photo. Prices may be adjusted for events such as all-ladies tables, influencers, birthdays, New Year and Christmas, so please ask a manager via the KakaoTalk or SMS buttons below.',
     'ACE CLUBの席と配置図のご案内です。席ごとの予想料金は写真の下に詳しく分けて記載しています。女性のみ・インフルエンサー・誕生日・新年・クリスマスなど各種イベントにより料金が調整される場合があるため、下のカカオトークまたはSMSでマネージャーにお問い合わせください。',
     '以下为ACE CLUB座位及布局图。各座位预估价格详见照片下方。价格可能因全女生、网红、生日、新年、圣诞节等各类活动而调整，请通过下方KakaoTalk或短信向经理咨询。',
     'นี่คือผังที่นั่งของ ACE CLUB ราคาประมาณการของแต่ละที่นั่งแสดงไว้ใต้ภาพ ราคาอาจปรับตามอีเวนต์ต่าง ๆ เช่น โต๊ะผู้หญิงล้วน อินฟลูเอนเซอร์ วันเกิด ปีใหม่ และคริสต์มาส กรุณาสอบถามผู้จัดการผ่าน KakaoTalk หรือ SMS ด้านล่าง'],
    ['C존(메인)','C Zone (Main)','Cゾーン(メイン)','C区(主区)','โซน C (เมน)'],
    ['300만원 ~','KRW 3,000,000 ~','300万ウォン～','300万韩元起','3,000,000 วอน ~'],
    ['메인 무드와 동선 접근성이 강한 구역입니다.','The zone with the main vibe and easiest access.','メインの雰囲気とアクセスの良さが魅力のエリアです。','主氛围区域，动线便利。','โซนบรรยากาศหลัก เข้าถึงง่าย'],
    ['D존 · R존','D Zone · R Zone','Dゾーン · Rゾーン','D区 · R区','โซน D · โซน R'],
    ['200만원 ~','KRW 2,000,000 ~','200万ウォン～','200万韩元起','2,000,000 วอน ~'],
    ['메인 플로어 인접 구역으로 예약 목적에 따라 선택 가능합니다.','Next to the main floor; choose according to your purpose.','メインフロアに隣接したエリアで、目的に応じて選べます。','紧邻主舞池，可根据需求选择。','ติดกับฟลอร์หลัก เลือกได้ตามวัตถุประสงค์'],
    ['T존','T Zone','Tゾーン','T区','โซน T'],
    ['100만원 ~','KRW 1,000,000 ~','100万ウォン～','100万韩元起','1,000,000 วอน ~'],
    ['상대적으로 진입 장벽이 낮은 테이블 구역입니다.','A table zone with a relatively low entry barrier.','比較的気軽に利用できるテーブルエリアです。','门槛相对较低的卡座区。','โซนโต๊ะที่เข้าถึงได้ง่ายกว่า'],
    ['조각 안내','Table share','相席のご案内','拼桌说明','แชร์โต๊ะ'],
    ['위치별 상이','Varies by spot','位置により異なる','因位置而异','ต่างกันตามตำแหน่ง'],
    ['일렉통로 N10-1 · 일렉준메인 N15-18 · 일렉초메인 N27-35 · 일렉왕자리 N70-80',
     'Elec aisle N10-1 · Elec semi-main N15-18 · Elec super-main N27-35 · Elec king seat N70-80',
     'エレク通路 N10-1 · エレク準メイン N15-18 · エレク超メイン N27-35 · エレク王席 N70-80',
     '电音通道 N10-1 · 电音次主区 N15-18 · 电音超主区 N27-35 · 电音王座 N70-80',
     'ทางเดินอิเล็ก N10-1 · กึ่งเมนอิเล็ก N15-18 · ซูเปอร์เมนอิเล็ก N27-35 · ที่นั่งคิงอิเล็ก N70-80'],

    /* Open */
    ['강남 클럽 에이스는 365일 쉬는 날 없이 오픈 합니다. 클러빙에 참고 부탁드립니다.',
     'Gangnam Club ACE is open 365 days a year with no days off. Plan your night accordingly.',
     '江南クラブACEは365日休まず営業しています。クラビングのご参考にしてください。',
     '江南夜店ACE全年365天无休营业，欢迎参考安排。',
     'คลับ ACE กังนัมเปิดทุกวันตลอด 365 วันไม่มีวันหยุด'],

    /* Location */
    ['Location','','アクセス','位置','ที่ตั้ง'],
    ['서울시 서초구 강남대로 597','597 Gangnam-daero, Seocho-gu, Seoul','ソウル市瑞草区江南大路597','首尔市瑞草区江南大路597号','597 Gangnam-daero, Seocho-gu, Seoul'],
    ['예약 문의: 박병규','Reservations: Park Byeong-gyu','予約お問い合わせ：パク・ビョンギュ','预订咨询：Park Byeong-gyu (박병규)','ติดต่อจอง: ปาร์ค บย็องกยู'],
    ['문자:','SMS:','SMS：','短信：','SMS:'],
    ['카톡:','KakaoTalk:','カカオトーク：','KakaoTalk：','KakaoTalk:'],
    ['오픈카톡 문의','Open chat inquiry','オープンチャットで問い合わせ','开放聊天咨询','สอบถามผ่านโอเพนแชท'],

    /* QNA */
    ['자주 묻는 질문','FAQ','よくある質問','常见问题','คำถามที่พบบ่อย'],
    ['Q. 게스트 무료입장 가능한가요?','Q. Is free guest entry available?','Q. ゲスト無料入場はできますか？','Q. 可以嘉宾免费入场吗？','Q. เข้าแบบเกสต์ฟรีได้ไหม?'],
    ['A. 여성분은 가능하고, 남성분들은 테이블을 잡아야 입장 가능 합니다.',
     'A. Yes for women; men need to book a table to enter.',
     'A. 女性は可能で、男性はテーブル予約が必要です。',
     'A. 女士可以，男士需订卡座才能入场。',
     'A. ผู้หญิงเข้าได้ ส่วนผู้ชายต้องจองโต๊ะจึงจะเข้าได้'],
    ['Q. 짐맡김 가능한가요?','Q. Can I leave my belongings?','Q. 荷物を預けられますか？','Q. 可以寄存物品吗？','Q. ฝากของได้ไหม?'],
    ['A. 코트체크 내 물품보관소를 이용해 주시기 바랍니다.','A. Please use the storage at the coat check.','A. コートチェック内の荷物預かり所をご利用ください。','A. 请使用衣帽间内的寄存处。','A. กรุณาใช้บริการรับฝากของที่จุดฝากเสื้อโค้ท'],
    ['Q. 잔술, 빠바틀 가능한가요?','Q. Are drinks by the glass or quick bottles available?','Q. グラス売りや「パボトル」はできますか？','Q. 可以单杯或快速开瓶吗？','Q. สั่งเป็นแก้วหรือขวดด่วนได้ไหม?'],
    ['A. 인플루언서 등일 경우 재량에 따라 가능합니다.','A. Possible at our discretion, e.g. for influencers.','A. インフルエンサーなどの場合、裁量により可能です。','A. 如为网红等，可酌情提供。','A. ได้ตามดุลยพินิจ เช่น กรณีอินฟลูเอนเซอร์'],
    ['Q. 서비스 바틀이 나올 수 있나요?','Q. Can I get a complimentary bottle?','Q. サービスボトルは出ますか？','Q. 可以赠送酒吗？','Q. ได้ขวดฟรีไหม?'],
    ['A. 방문 당일을 기준으로 생일이라면 신분증을 지참후 하단 영업진에게 알려주시면 서비스 바틀을 제공해 드릴 수 있습니다.',
     'A. If it is your birthday on the day of your visit, bring your ID and let our staff know via the buttons below — we can provide a complimentary bottle.',
     'A. 来店当日が誕生日の場合、身分証を持参のうえ下のスタッフにお知らせいただければ、サービスボトルをご提供できます。',
     'A. 如到店当天是您的生日，请携带身份证件并通过下方告知工作人员，可为您提供赠送酒。',
     'A. หากวันที่มาตรงกับวันเกิด โปรดนำบัตรประจำตัวมาและแจ้งพนักงานผ่านช่องทางด้านล่าง เราสามารถมอบขวดฟรีให้ได้'],
    ['Q. 조각 참여도 가능할까요?','Q. Can I join a table share?','Q. 相席に参加できますか？','Q. 可以参加拼桌吗？','Q. ร่วมแชร์โต๊ะได้ไหม?'],
    ['A. 조각은 자리 및 주류의 개수, 종류마다 가격이 상이하니 하단 카카오톡 문의를 통해 담당 매니저에게 연락해 보시기 바랍니다.',
     'A. Table share prices vary by seat and by the number and type of bottles, so please contact the manager via KakaoTalk below.',
     'A. 相席は席やお酒の本数・種類によって料金が異なるため、下のカカオトークから担当マネージャーにご連絡ください。',
     'A. 拼桌价格因座位及酒水数量、种类而异，请通过下方KakaoTalk联系负责经理。',
     'A. ราคาแชร์โต๊ะต่างกันตามที่นั่ง จำนวนและประเภทเครื่องดื่ม กรุณาติดต่อผู้จัดการผ่าน KakaoTalk ด้านล่าง'],
    ['Q. 입장료가 따로 있나요?','Q. Is there an entrance fee?','Q. 入場料はかかりますか？','Q. 需要入场费吗？','Q. มีค่าเข้าไหม?'],
    ['A. 여성분들은 게스트 입장으로 따로 입장료가 발생하지 않으나, 남성분들은 인원당 2만원으로 입장이 가능할 수 있습니다. 다만, 당일 업장 컨디션에 따라 유료입장도 어려울 수 있습니다.',
     'A. Women enter as guests with no entrance fee; men may be able to enter for KRW 20,000 per person. However, depending on the venue’s condition that day, even paid entry may not be possible.',
     'A. 女性はゲスト入場のため入場料はかかりませんが、男性は1人2万ウォンで入場できる場合があります。ただし当日の店舗状況により有料入場も難しい場合があります。',
     'A. 女士以嘉宾身份入场，无需入场费；男士每人2万韩元或可入场。但视当天场内情况，付费入场也可能无法进入。',
     'A. ผู้หญิงเข้าแบบเกสต์ไม่มีค่าเข้า ส่วนผู้ชายอาจเข้าได้ในราคา 20,000 วอนต่อคน อย่างไรก็ตาม ขึ้นอยู่กับสถานการณ์ของร้านในวันนั้น การเข้าแบบเสียค่าเข้าก็อาจทำไม่ได้'],

    /* Footer */
    ['ACE CLUB SEOUL · 에이스 클럽 · 클럽 에이스','ACE CLUB SEOUL · Ace Club · Club Ace','ACE CLUB SEOUL · エースクラブ · クラブエース','ACE CLUB SEOUL · ACE夜店','ACE CLUB SEOUL · เอซคลับ · คลับเอซ'],
    ['서울시 서초구 강남대로 597 · 예약 문의 박병규 · 010 7243 3101',
     '597 Gangnam-daero, Seocho-gu, Seoul · Reservations: Park Byeong-gyu · +82 10 7243 3101',
     'ソウル市瑞草区江南大路597 · 予約：パク・ビョンギュ · +82 10 7243 3101',
     '首尔市瑞草区江南大路597号 · 预订咨询：Park Byeong-gyu (박병규) · +82 10 7243 3101',
     '597 Gangnam-daero, Seocho-gu, Seoul · ติดต่อจอง: ปาร์ค บย็องกยู · +82 10 7243 3101'],

    /* 하단 CTA / 위챗 팝업 */
    ['문자문의','SMS','SMS','短信','SMS'],
    ['카톡문의','KakaoTalk','カカオトーク','KakaoTalk','KakaoTalk'],
    ['위챗문의','WeChat','WeChat','微信','WeChat'],
    ['왓츠앱문의','WhatsApp','WhatsApp','WhatsApp','WhatsApp'],
    ['WeChat','','','微信',''],

    /* aria-label · alt */
    ['에이스 클럽 상단 메뉴','ACE CLUB top menu','ACE CLUB 上部メニュー','ACE CLUB 顶部菜单','เมนูด้านบน ACE CLUB'],
    ['ACE CLUB 홈으로 이동','Go to ACE CLUB home','ACE CLUB ホームへ','返回ACE CLUB首页','ไปหน้าแรก ACE CLUB'],
    ['ACE CLUB SEOUL 로고','ACE CLUB SEOUL logo','ACE CLUB SEOUL ロゴ','ACE CLUB SEOUL 标志','โลโก้ ACE CLUB SEOUL'],
    ['상단 메뉴 열기','Open menu','メニューを開く','打开菜单','เปิดเมนู'],
    ['주요 메뉴','Main menu','メインメニュー','主菜单','เมนูหลัก'],
    ['에이스 클럽 핵심 정보','ACE CLUB key facts','ACE CLUB 主要情報','ACE CLUB 核心信息','ข้อมูลสำคัญ ACE CLUB'],
    ['에이스 클럽 인스타그램 바로가기','ACE CLUB Instagram','ACE CLUB インスタグラム','ACE CLUB Instagram','Instagram ของ ACE CLUB'],
    ['강남 클럽 세부 가이드 바로가기','Gangnam club detailed guides','江南クラブ 詳細ガイド','江南夜店详细指南','คู่มือคลับกังนัมแบบละเอียด'],
    ['에이스 클럽 할로윈 조판 이미지','ACE CLUB Halloween table booking images','ACE CLUB ハロウィン テーブル予約画像','ACE CLUB 万圣节订台图片','ภาพจองโต๊ะฮาโลวีน ACE CLUB'],
    ['이전 조판','Previous','前へ','上一张','ก่อนหน้า'],
    ['다음 조판','Next','次へ','下一张','ถัดไป'],
    ['할로윈 조판 선택','Select Halloween image','ハロウィン画像を選択','选择万圣节图片','เลือกภาพฮาโลวีน'],
    ['2026 ACE HALLOWEEN 10월 30일 금요일 에이스 클럽 조판 및 테이블 가격','2026 ACE HALLOWEEN Fri Oct 30 ACE CLUB table booking and prices','2026 ACE HALLOWEEN 10月30日(金) ACE CLUB テーブル予約・料金','2026 ACE HALLOWEEN 10月30日周五 ACE CLUB 订台及卡座价格','2026 ACE HALLOWEEN ศุกร์ 30 ต.ค. ACE CLUB การจองและราคาโต๊ะ'],
    ['2026 ACE HALLOWEEN 10월 31일 토요일 에이스 클럽 조판 및 테이블 가격','2026 ACE HALLOWEEN Sat Oct 31 ACE CLUB table booking and prices','2026 ACE HALLOWEEN 10月31日(土) ACE CLUB テーブル予約・料金','2026 ACE HALLOWEEN 10月31日周六 ACE CLUB 订台及卡座价格','2026 ACE HALLOWEEN เสาร์ 31 ต.ค. ACE CLUB การจองและราคาโต๊ะ'],
    ['SPACE SEOUL 10월 30일 금요일 할로윈 조판 및 테이블 가격','SPACE SEOUL Fri Oct 30 Halloween table booking and prices','SPACE SEOUL 10月30日(金) ハロウィン テーブル予約・料金','SPACE SEOUL 10月30日周五 万圣节订台及价格','SPACE SEOUL ศุกร์ 30 ต.ค. การจองและราคาโต๊ะฮาโลวีน'],
    ['SPACE SEOUL 10월 31일 토요일 할로윈 조판 및 테이블 가격','SPACE SEOUL Sat Oct 31 Halloween table booking and prices','SPACE SEOUL 10月31日(土) ハロウィン テーブル予約・料金','SPACE SEOUL 10月31日周六 万圣节订台及价格','SPACE SEOUL เสาร์ 31 ต.ค. การจองและราคาโต๊ะฮาโลวีน'],
    ['에이스 클럽 사람들 및 현장 분위기 이미지','ACE CLUB crowd and atmosphere photos','ACE CLUB 来場者と雰囲気の写真','ACE CLUB 现场人群与氛围照片','ภาพผู้คนและบรรยากาศ ACE CLUB'],
    ['이전 사진','Previous photo','前の写真','上一张照片','ภาพก่อนหน้า'],
    ['다음 사진','Next photo','次の写真','下一张照片','ภาพถัดไป'],
    ['사람들 사진 선택','Select photo','写真を選択','选择照片','เลือกภาพ'],
    ['에이스 클럽 강남클럽 현장 분위기와 사람들 1','ACE CLUB Gangnam crowd and atmosphere 1','ACE CLUB 江南クラブの雰囲気と人々 1','ACE CLUB 江南夜店现场氛围与人群 1','บรรยากาศและผู้คน ACE CLUB กังนัม 1'],
    ['클럽 에이스 공연과 플로어 분위기 2','Club ACE performance and floor 2','クラブACE パフォーマンスとフロア 2','ACE夜店演出与舞池氛围 2','การแสดงและฟลอร์ คลับ ACE 2'],
    ['에이스클럽 테이블과 샴페인 연출 분위기 3','ACE CLUB tables and champagne show 3','ACE CLUB テーブルとシャンパン演出 3','ACE CLUB 卡座与香槟演出 3','โต๊ะและการแสดงแชมเปญ ACE CLUB 3'],
    ['클럽에이스 DJ 부스와 플로어 사람들 4','Club ACE DJ booth and floor crowd 4','クラブACE DJブースとフロア 4','ACE夜店DJ台与舞池人群 4','บูธ DJ และผู้คนบนฟลอร์ คลับ ACE 4'],
    ['강남 에이스 클럽 그린 라이트 현장 분위기 5','Gangnam ACE CLUB green lights 5','江南ACE CLUB グリーンライト 5','江南ACE CLUB 绿色灯光氛围 5','ไฟสีเขียว ACE CLUB กังนัม 5'],
    ['ACE CLUB SEOUL 테이블 플로어 사람들 6','ACE CLUB SEOUL table floor crowd 6','ACE CLUB SEOUL テーブルフロア 6','ACE CLUB SEOUL 卡座舞池人群 6','ผู้คนบนฟลอร์โต๊ะ ACE CLUB SEOUL 6'],
    ['클럽 에이스 레이저와 DJ 부스 분위기 7','Club ACE lasers and DJ booth 7','クラブACE レーザーとDJブース 7','ACE夜店激光与DJ台 7','เลเซอร์และบูธ DJ คลับ ACE 7'],
    ['에이스 클럽 강남 클럽 플로어 전체 분위기 8','ACE CLUB Gangnam full floor view 8','ACE CLUB 江南クラブ フロア全体 8','ACE CLUB 江南夜店舞池全景 8','ภาพรวมฟลอร์ ACE CLUB กังนัม 8'],
    ['에이스 클럽 메뉴 이미지','ACE CLUB menu images','ACE CLUB メニュー画像','ACE CLUB 菜单图片','ภาพเมนู ACE CLUB'],
    ['이전 메뉴','Previous menu','前のメニュー','上一页菜单','เมนูก่อนหน้า'],
    ['다음 메뉴','Next menu','次のメニュー','下一页菜单','เมนูถัดไป'],
    ['메뉴 페이지 선택','Select menu page','メニューページを選択','选择菜单页','เลือกหน้าเมนู'],
    ['ACE CLUB SEOUL 샴페인, 코냑, 위스키, 보드카, 데킬라 메뉴 및 가격표','ACE CLUB SEOUL champagne, cognac, whisky, vodka, tequila menu and prices','ACE CLUB SEOUL シャンパン・コニャック・ウイスキー・ウォッカ・テキーラ メニューと料金','ACE CLUB SEOUL 香槟、干邑、威士忌、伏特加、龙舌兰菜单及价格','เมนูและราคาแชมเปญ คอนยัค วิสกี้ วอดก้า เตกีล่า ACE CLUB SEOUL'],
    ['ACE CLUB SEOUL 샴페인 세트 메뉴 및 가격표','ACE CLUB SEOUL champagne set menu and prices','ACE CLUB SEOUL シャンパンセット メニューと料金','ACE CLUB SEOUL 香槟套餐菜单及价格','เมนูและราคาเซ็ตแชมเปญ ACE CLUB SEOUL'],
    ['ACE CLUB SEOUL 스와로브스키 에디션 아르망디 가격 안내','ACE CLUB SEOUL Armand de Brignac Swarovski edition price','ACE CLUB SEOUL アルマン・ド・ブリニャック スワロフスキー エディション料金','ACE CLUB SEOUL 黑桃A施华洛世奇版价格','ราคา Armand de Brignac รุ่น Swarovski ACE CLUB SEOUL'],
    ['연출 가이드','Effects guide','演出ガイド','演出指南','คู่มือการแสดง'],
    ['2026년 5월 19일 화요일 ACE CLUB SEOUL DJ 라인업 타임테이블','ACE CLUB SEOUL DJ line-up timetable, Tue May 19 2026','2026年5月19日(火) ACE CLUB SEOUL DJラインナップ タイムテーブル','2026年5月19日周二 ACE CLUB SEOUL DJ阵容时间表','ตารางไลน์อัพ DJ ACE CLUB SEOUL อังคาร 19 พ.ค. 2026'],
    ['ACE CLUB SEOUL 조판 지도, C존 D존 R존 T존 및 BAR DJ 위치 안내','ACE CLUB SEOUL table map: C, D, R, T zones, BAR and DJ locations','ACE CLUB SEOUL 座席マップ：C・D・R・Tゾーン、BAR・DJの位置','ACE CLUB SEOUL 座位图：C、D、R、T区及吧台、DJ位置','แผนผังโต๊ะ ACE CLUB SEOUL: โซน C D R T และตำแหน่ง BAR DJ'],
    ['에이스 클럽 플로어 및 테이블 구역 실사 이미지','ACE CLUB floor and table zone photos','ACE CLUB フロア・テーブルエリア実写','ACE CLUB 舞池及卡座区实拍','ภาพจริงฟลอร์และโซนโต๊ะ ACE CLUB'],
    ['이전 플로어 사진','Previous floor photo','前のフロア写真','上一张场地照片','ภาพฟลอร์ก่อนหน้า'],
    ['다음 플로어 사진','Next floor photo','次のフロア写真','下一张场地照片','ภาพฟลอร์ถัดไป'],
    ['플로어 사진 선택','Select floor photo','フロア写真を選択','选择场地照片','เลือกภาพฟลอร์'],
    ['365일 연중무휴 OPEN, CLUB ACE SEOUL 오픈 안내','Open 365 days a year — CLUB ACE SEOUL hours','365日年中無休 OPEN、CLUB ACE SEOUL 営業案内','全年无休 OPEN，CLUB ACE SEOUL 营业信息','เปิดทุกวันตลอดปี CLUB ACE SEOUL'],
    ['ACE CLUB SEOUL 위치 표시','ACE CLUB SEOUL location','ACE CLUB SEOUL 所在地','ACE CLUB SEOUL 位置','ตำแหน่ง ACE CLUB SEOUL'],
    ['하단 고정 예약 문의','Reservation contact','予約お問い合わせ','预订咨询','ติดต่อจอง'],
    ['에이스 클럽 문자 문의','ACE CLUB SMS inquiry','ACE CLUB SMSで問い合わせ','ACE CLUB 短信咨询','สอบถาม ACE CLUB ทาง SMS'],
    ['에이스 클럽 카카오톡 문의','ACE CLUB KakaoTalk inquiry','ACE CLUB カカオトークで問い合わせ','ACE CLUB KakaoTalk咨询','สอบถาม ACE CLUB ทาง KakaoTalk'],
    ['에이스 클럽 위챗 문의','ACE CLUB WeChat inquiry','ACE CLUB WeChatで問い合わせ','ACE CLUB 微信咨询','สอบถาม ACE CLUB ทาง WeChat'],
    ['에이스 클럽 왓츠앱 문의','ACE CLUB WhatsApp inquiry','ACE CLUB WhatsAppで問い合わせ','ACE CLUB WhatsApp咨询','สอบถาม ACE CLUB ทาง WhatsApp'],
    ['위챗 ID','WeChat ID','WeChat ID','微信号','WeChat ID'],
    ['위챗 앱 열기','Open WeChat app','WeChatアプリを開く','打开微信','เปิดแอป WeChat']
  ];

  /* 번호가 붙는 문구 */
  var P = [
    [/^(\d+)번째 보기$/, ['View $1','$1枚目を表示','查看第$1张','ดูภาพที่ $1']],
    [/^에이스 클럽 플로어 및 테이블 구역 실사 이미지 (\d+)$/, ['ACE CLUB floor and table zone photo $1','ACE CLUB フロア・テーブルエリア実写 $1','ACE CLUB 舞池及卡座区实拍 $1','ภาพจริงฟลอร์และโซนโต๊ะ ACE CLUB $1']]
  ];

  var DICT = {};
  L.forEach(function(l){ DICT[l] = {}; });
  T.forEach(function(row){
    L.forEach(function(l,i){ if(row[i+1]) DICT[l][row[0]] = row[i+1]; });
  });

  function lookup(lang, src){
    var t = DICT[lang][src];
    if(t !== undefined) return t;
    for(var i=0;i<P.length;i++){
      if(P[i][0].test(src)) return src.replace(P[i][0], P[i][1][L.indexOf(lang)]);
    }
    return null;
  }

  var ATTRS = ['alt','aria-label','title'];
  var textStore = new Map();   /* Text 노드 → 원문 */
  var attrStore = new Map();   /* Element → {attr: 원문} */
  var titleSrc = document.title;
  var current = 'ko';

  function eachText(fn){
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        var p = n.parentNode;
        if(!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if(p.closest && p.closest('.lang-switch')) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var n; while((n = w.nextNode())) fn(n);
  }

  function apply(lang){
    eachText(function(n){
      if(!textStore.has(n)) textStore.set(n, n.nodeValue);
      var raw = textStore.get(n);
      if(lang === 'ko'){ n.nodeValue = raw; return; }
      var m = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
      var key = m[2].replace(/\s+/g,' ');
      var t = lookup(lang, key);
      n.nodeValue = t === null ? raw : m[1] + t + m[3];
    });
    document.querySelectorAll('[alt],[aria-label],[title]').forEach(function(el){
      if(el.closest('.lang-switch')) return;
      var store = attrStore.get(el);
      if(!store){ store = {}; attrStore.set(el, store); }
      ATTRS.forEach(function(a){
        if(!el.hasAttribute(a)) return;
        if(!(a in store)) store[a] = el.getAttribute(a);
        var raw = store[a];
        if(lang === 'ko'){ el.setAttribute(a, raw); return; }
        var t = lookup(lang, raw.trim());
        el.setAttribute(a, t === null ? raw : t);
      });
    });
    document.title = lang === 'ko' ? titleSrc : (lookup(lang, titleSrc) || titleSrc);
    document.documentElement.setAttribute('lang', HTML_LANG[lang]);
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    current = lang;
  }

  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.addEventListener('click', function(){
      var l = b.getAttribute('data-lang');
      apply(current === l ? 'ko' : l);
    });
  });
})();
