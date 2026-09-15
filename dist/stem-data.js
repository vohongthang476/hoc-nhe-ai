(function () {
  "use strict";

  window.HOCNHE_STEM = [
    {
      id: "g2-paper-bridge", grade: 2, category: "engineering", icon: "🌉", title: "Cây cầu giấy khỏe nhất",
      time: "25 phút", level: "Dễ", mission: "Làm một cây cầu bằng đúng một tờ giấy A4, bắc qua hai chồng sách và chịu được nhiều đồng xu nhất.",
      goals: ["Nhận ra hình dạng làm thay đổi độ cứng của giấy", "Đếm và so sánh số đồng xu", "Thử - sửa - thử lại một thiết kế"],
      materials: ["1 tờ giấy A4", "2 chồng sách cao bằng nhau", "10-30 đồng xu hoặc nắp chai giống nhau"],
      steps: ["Đặt hai chồng sách cách nhau khoảng 15 cm.", "Đặt tờ giấy phẳng làm cầu và thử đặt từng đồng xu vào giữa.", "Gấp giấy thành nếp quạt hoặc tạo thành máng, rồi thử lại.", "Ghi số vật cầu chịu được ở mỗi kiểu và chọn thiết kế tốt nhất."],
      observe: ["Cầu giấy phẳng chịu được bao nhiêu vật?", "Cầu giấy gấp chịu được bao nhiêu vật?", "Kiểu gấp nào hiệu quả nhất?"],
      explain: "Các nếp gấp làm tờ giấy khó bị uốn cong hơn và giúp phân tán tải trọng. Kỹ sư cũng dùng hình dạng để tăng độ cứng cho cầu và mái nhà.",
      questions: ["Điều gì được giữ giống nhau trong các lần thử?", "Em sẽ thay đổi thiết kế thế nào để cầu khỏe hơn?"],
      safety: "Dùng sách nhẹ, đặt cầu trên mặt bàn thấp và không dùng vật nặng có thể rơi vào chân."
    },
    {
      id: "g2-float-boat", grade: 2, category: "science", icon: "⛵", title: "Thuyền giấy chở hàng",
      time: "25 phút", level: "Dễ", mission: "Tạo một chiếc thuyền giấy có thể nổi và chở được nhiều nắp chai mà không chìm.",
      goals: ["Quan sát hiện tượng nổi và chìm", "Đếm tải của thuyền", "So sánh hai hình dạng thuyền"],
      materials: ["2 tờ giấy cùng cỡ", "Chậu nước nông", "Nắp chai nhựa", "Khăn lau"],
      steps: ["Vo một tờ giấy thành cục nhỏ, đặt lên nước và quan sát.", "Tờ còn lại gấp thành khay có đáy rộng, đặt nhẹ lên nước.", "Thêm từng nắp chai, dàn đều và đếm đến khi thuyền chìm.", "Thay đổi độ rộng hoặc độ cao thành thuyền rồi thử lại."],
      observe: ["Cục giấy nổi hay chìm?", "Thuyền chở tối đa bao nhiêu nắp chai?", "Nước tràn vào từ vị trí nào?"],
      explain: "Hình dạng chiếc thuyền giúp nó chiếm chỗ của nhiều nước hơn. Nước đẩy thuyền lên; khi tải quá lớn hoặc nước tràn vào, thuyền sẽ chìm.",
      questions: ["Vì sao cùng là giấy nhưng hai hình dạng cho kết quả khác nhau?", "Nên đặt hàng ở đâu để thuyền cân bằng?"],
      safety: "Chỉ dùng chậu nước nông, lau nước đổ ngay và không thực hiện gần ổ điện."
    },
    {
      id: "g2-shadow-clock", grade: 2, category: "environment", icon: "☀️", title: "Bản đồ bóng nắng",
      time: "3 lần, mỗi lần 10 phút", level: "Dễ", mission: "Theo dõi bóng của một vật vào các thời điểm khác nhau để phát hiện bóng thay đổi như thế nào.",
      goals: ["Nhận biết ánh sáng tạo ra bóng", "Đo chiều dài bằng xăng-ti-mét", "Ghi lại thay đổi theo thời gian"],
      materials: ["1 chai nước hoặc que cắm trong cốc đất", "Phấn hoặc giấy lớn", "Thước", "Đồng hồ"],
      steps: ["Đặt vật ở vị trí có nắng và đánh dấu vị trí để không di chuyển.", "Lúc buổi sáng, vẽ đầu bóng, đo chiều dài và ghi giờ.", "Lặp lại vào gần trưa và buổi chiều ở đúng vị trí.", "Nối ba dấu, so sánh hướng và chiều dài của bóng."],
      observe: ["Bóng dài bao nhiêu ở mỗi lần?", "Bóng chỉ theo hướng nào?", "Lúc nào bóng ngắn nhất?"],
      explain: "Khi vị trí biểu kiến của Mặt Trời trên bầu trời thay đổi, hướng và chiều dài bóng cũng thay đổi. Gần giữa trưa, Mặt Trời thường ở cao hơn nên bóng thường ngắn hơn.",
      questions: ["Vì sao phải giữ vật ở nguyên vị trí?", "Nếu trời nhiều mây, kết quả có gì khác?"],
      safety: "Đội mũ khi ở ngoài trời, không nhìn thẳng vào Mặt Trời và có người lớn đi cùng."
    },
    {
      id: "g3-string-phone", grade: 3, category: "science", icon: "☎️", title: "Điện thoại truyền âm bằng dây",
      time: "30 phút", level: "Vừa", mission: "Chế tạo điện thoại từ hai cốc giấy và tìm điều kiện để giọng nói truyền rõ nhất.",
      goals: ["Nhận biết âm thanh liên quan đến rung động", "Thực hiện phép thử có kiểm soát", "Mô tả kết quả bằng từ rõ/yếu"],
      materials: ["2 cốc giấy", "2-4 m dây dài", "Băng dính", "Bút chì nhọn do người lớn sử dụng"],
      steps: ["Nhờ người lớn tạo một lỗ nhỏ ở đáy mỗi cốc.", "Luồn hai đầu dây qua lỗ, buộc nút và dán chắc bên trong.", "Hai bạn đứng xa, kéo dây thẳng nhưng không quá căng; một bạn nói, một bạn nghe.", "Thử khi dây chùng, dây chạm vật khác và dây căng; ghi mức độ nghe rõ."],
      observe: ["Dây căng hay chùng truyền âm rõ hơn?", "Điều gì xảy ra khi tay chạm vào dây?", "Khoảng cách thử là bao nhiêu mét?"],
      explain: "Giọng nói làm đáy cốc rung. Rung động truyền dọc theo dây tới cốc kia và làm không khí trong cốc rung, tạo âm mà tai nghe được.",
      questions: ["Vì sao dây không nên chạm vào bàn hoặc tường?", "Có thể thay đổi vật liệu dây để thử điều gì?"],
      safety: "Người lớn thực hiện thao tác tạo lỗ. Không quấn dây quanh cổ và không chạy khi đang cầm cốc."
    },
    {
      id: "g3-wind-spinner", grade: 3, category: "engineering", icon: "🌬️", title: "Cánh quay bắt gió",
      time: "30 phút", level: "Vừa", mission: "Thiết kế một cánh quay bằng giấy có thể quay đều trước luồng gió của quạt.",
      goals: ["Nhận biết chuyển động do gió", "Thiết kế và cải tiến sản phẩm", "So sánh tốc độ quay bằng quan sát"],
      materials: ["Giấy vuông", "Kéo đầu tròn", "Bút chì có tẩy", "Ghim mũ do người lớn lắp", "Quạt bàn"],
      steps: ["Gấp chéo tờ giấy để xác định tâm, cắt từ bốn góc gần tới tâm.", "Gấp xen kẽ bốn đầu cánh vào giữa.", "Nhờ người lớn dùng ghim gắn cánh vào đầu tẩy bút chì, để cánh quay tự do.", "Đặt cách quạt ở ba khoảng cách khác nhau và quan sát tốc độ quay."],
      observe: ["Khoảng cách nào làm cánh quay nhanh nhất?", "Cánh có bị lệch hay rung không?", "Sau khi chỉnh, sản phẩm tốt hơn ở điểm nào?"],
      explain: "Không khí chuyển động tác dụng lực lên các cánh nghiêng. Lực đó tạo chuyển động quay quanh trục.",
      questions: ["Điều gì xảy ra nếu các cánh không bằng nhau?", "Làm sao thử công bằng hai mẫu cánh?"],
      safety: "Người lớn lắp và tháo ghim. Giữ tay, tóc và giấy cách lồng quạt; không tháo lồng bảo vệ."
    },
    {
      id: "g3-water-filter", grade: 3, category: "environment", icon: "💧", title: "Bộ lọc nước mô phỏng",
      time: "35 phút", level: "Vừa", mission: "Xếp các lớp vật liệu để làm nước có đất nhìn trong hơn và tìm thứ tự lọc hiệu quả.",
      goals: ["Quan sát quá trình lọc vật rắn", "So sánh trước và sau", "Hiểu giới hạn của lọc đơn giản"],
      materials: ["Chai nhựa đã được người lớn cắt", "Vải sạch", "Sỏi đã rửa", "Cát sạch", "Cốc", "Nước pha một ít đất"],
      steps: ["Người lớn cắt chai và úp phần đầu chai như phễu.", "Đặt vải ở miệng chai, thêm lần lượt cát và sỏi.", "Rót chậm nước có đất, hứng nước chảy xuống cốc.", "Quan sát màu, hạt lơ lửng; thay thứ tự lớp lọc và so sánh."],
      observe: ["Nước trước và sau khác nhau thế nào?", "Lớp nào giữ hạt lớn?", "Cách xếp nào cho nước nhìn trong hơn?"],
      explain: "Các khe giữa sỏi, cát và vải giữ lại một phần hạt rắn có kích thước khác nhau. Nước nhìn trong hơn vẫn có thể chứa vi sinh vật hoặc chất hòa tan.",
      questions: ["Vì sao nước sau lọc không được uống?", "Làm thế nào để so sánh hai bộ lọc công bằng?"],
      safety: "Tuyệt đối không uống nước thí nghiệm. Người lớn cắt chai; rửa tay và vệ sinh khu vực sau khi làm."
    },
    {
      id: "g4-soil-water", grade: 4, category: "environment", icon: "🌱", title: "Loại đất nào giữ nước tốt?",
      time: "35 phút", level: "Vừa", mission: "So sánh khả năng cho nước đi qua và giữ nước của cát, đất vườn và hỗn hợp giàu mùn.",
      goals: ["Nhận biết đất có thành phần khác nhau", "Đo thể tích nước", "Xác định biến cần giữ giống nhau"],
      materials: ["3 cốc có lỗ thoát giống nhau do người lớn chuẩn bị", "Cát sạch, đất vườn, đất có mùn", "3 cốc hứng", "Cốc đong", "Nước"],
      steps: ["Cho cùng một lượng mỗi loại đất vào ba cốc.", "Rót cùng một thể tích nước vào từng cốc trong cùng khoảng thời gian.", "Chờ 10 phút rồi đo lượng nước chảy xuống cốc hứng.", "So sánh: mẫu có ít nước chảy ra hơn đã giữ lại nhiều nước hơn."],
      observe: ["Lượng nước ban đầu ở mỗi mẫu là bao nhiêu?", "Sau 10 phút thu được bao nhiêu?", "Mẫu nào giữ nhiều nước nhất?"],
      explain: "Kích thước hạt và lượng mùn tạo ra các khoảng trống khác nhau trong đất. Điều đó ảnh hưởng đến tốc độ nước thấm qua và lượng nước được giữ lại.",
      questions: ["Vì sao phải dùng cùng lượng đất và nước?", "Kết quả này gợi ý gì khi chọn đất trồng cây?"],
      safety: "Không dùng đất có phân tươi hoặc rác sắc nhọn. Đeo găng nếu cần và rửa tay sau thí nghiệm."
    },
    {
      id: "g4-cool-roof", grade: 4, category: "engineering", icon: "🏠", title: "Mái nhà nào chống nóng?",
      time: "40 phút", level: "Vừa", mission: "Làm ba mái che khác màu/vật liệu và xem mái nào giúp viên đá lạnh tan chậm hơn dưới nắng.",
      goals: ["So sánh khả năng hấp thụ nhiệt", "Đo thời gian", "Thiết kế phép thử công bằng"],
      materials: ["3 hộp nhỏ giống nhau", "Giấy trắng, giấy đen, giấy bạc", "3 viên đá gần bằng nhau", "Đồng hồ", "Khay hứng nước"],
      steps: ["Bọc nắp ba hộp lần lượt bằng giấy trắng, giấy đen và giấy bạc.", "Đặt một viên đá vào mỗi hộp rồi đóng nắp cùng lúc.", "Đặt các hộp cạnh nhau ở nơi có nắng trong 15 phút.", "Đổ phần nước tan vào cốc nhỏ hoặc quan sát kích thước đá còn lại để so sánh."],
      observe: ["Mái nào làm đá tan nhanh nhất?", "Mái nào làm đá còn lại nhiều nhất?", "Thời tiết khi thử như thế nào?"],
      explain: "Bề mặt khác nhau phản xạ và hấp thụ bức xạ khác nhau. Màu tối thường hấp thụ nhiều năng lượng hơn, còn bề mặt sáng hoặc phản chiếu thường phản xạ nhiều hơn.",
      questions: ["Vì sao các hộp phải giống nhau?", "Kết quả gợi ý chọn màu mái nhà thế nào?"],
      safety: "Không nhìn thẳng Mặt Trời. Thực hiện ở nơi an toàn, lau nước đá tan để tránh trơn trượt."
    },
    {
      id: "g4-simple-circuit", grade: 4, category: "technology", icon: "💡", title: "Đèn báo mạch kín",
      time: "30 phút", level: "Cần người lớn", mission: "Lắp một mạch điện áp thấp để bóng đèn nhỏ sáng và khám phá thế nào là mạch kín.",
      goals: ["Nhận biết nguồn điện, dây dẫn và vật sử dụng điện", "Phân biệt mạch kín và mạch hở", "Vẽ sơ đồ kết nối đơn giản"],
      materials: ["Hộp 2 pin AA", "2 pin AA", "Bóng LED loại phù hợp 3V", "Dây có kẹp cá sấu", "Băng dính"],
      steps: ["Người lớn kiểm tra đúng loại pin, LED và dây trước khi bắt đầu.", "Nối một cực hộp pin với một chân LED, cực còn lại với chân LED kia.", "Nếu LED chưa sáng, ngắt mạch rồi đổi chiều hai chân LED.", "Thử ngắt một kẹp dây để quan sát mạch hở, sau đó nối lại thành mạch kín."],
      observe: ["Khi nào LED sáng?", "Khi tháo một đầu dây thì điều gì xảy ra?", "Vẽ đường đi liên tục của dòng điện trong mạch."],
      explain: "Đèn chỉ sáng khi các bộ phận tạo thành đường nối kín. LED còn cần được nối đúng chiều. Đây là mạch điện áp thấp dùng cho học tập.",
      questions: ["Mạch hở khác mạch kín ở đâu?", "Vì sao cần ngắt pin sau khi thí nghiệm?"],
      safety: "Chỉ dùng pin AA và thiết bị 3V do người lớn kiểm tra. Không dùng ổ điện, không nối tắt hai cực pin và tháo pin sau khi làm."
    },
    {
      id: "g5-rubber-car", grade: 5, category: "engineering", icon: "🏎️", title: "Xe chạy bằng dây chun",
      time: "45 phút", level: "Khá", mission: "Thiết kế xe dùng năng lượng đàn hồi của dây chun và tối ưu để xe đi xa nhất.",
      goals: ["Nhận biết sự chuyển hóa năng lượng", "Đo quãng đường", "Cải tiến trục và bánh xe"],
      materials: ["Bìa cứng", "4 nắp chai", "2 que gỗ tròn", "2 ống hút", "Dây chun", "Băng dính", "Thước"],
      steps: ["Người lớn tạo lỗ giữa bốn nắp chai.", "Dán hai đoạn ống hút song song dưới bìa làm ổ trục.", "Luồn hai que qua ống hút và gắn bánh xe vào hai đầu.", "Móc dây chun từ thân xe vào trục sau, xoay trục để cuốn dây rồi thả xe.", "Đo quãng đường ba lần, chỉnh bánh/trục và thử lại."],
      observe: ["Xe đi được bao nhiêu xăng-ti-mét mỗi lần?", "Xe có đi thẳng không?", "Thay đổi nào giúp xe đi xa hơn?"],
      explain: "Dây chun bị xoắn tích trữ năng lượng đàn hồi. Khi thả, dây làm trục quay; bánh xe đẩy mặt đất và xe chuyển động.",
      questions: ["Vì sao trục cần song song?", "Cuốn dây nhiều hơn có luôn làm xe đi xa hơn không?"],
      safety: "Đeo kính bảo vệ nếu dây chun căng mạnh. Không hướng xe vào người; người lớn tạo lỗ trên nắp chai."
    },
    {
      id: "g5-drip-irrigation", grade: 5, category: "environment", icon: "🪴", title: "Hệ tưới nhỏ giọt tiết kiệm nước",
      time: "40 phút + theo dõi", level: "Vừa", mission: "Thiết kế hệ tưới nhỏ giọt từ chai nhựa và điều chỉnh để nước chảy chậm, đều cho chậu cây.",
      goals: ["Vận dụng hiểu biết về dòng chảy", "Đo thể tích theo thời gian", "Đề xuất giải pháp tiết kiệm nước"],
      materials: ["Chai nhựa có nắp", "Khay hoặc chậu cây", "Cốc đong", "Đồng hồ", "Kim do người lớn sử dụng"],
      steps: ["Nhờ người lớn tạo một lỗ rất nhỏ trên nắp chai.", "Cho một lượng nước đã đo vào chai, đóng nắp và úp trên khay.", "Đếm số giọt trong một phút hoặc đo lượng nước chảy ra sau 10 phút.", "Điều chỉnh kích thước lỗ hoặc độ cao chai, thử lại và chọn tốc độ phù hợp."],
      observe: ["Bao nhiêu giọt chảy trong một phút?", "Sau 10 phút còn lại bao nhiêu nước?", "Cách điều chỉnh nào làm dòng chảy đều hơn?"],
      explain: "Kích thước lỗ, độ cao cột nước và không khí đi vào chai ảnh hưởng đến tốc độ nước chảy. Tưới chậm giúp đưa nước gần rễ và giảm lượng nước chảy tràn.",
      questions: ["Làm sao tính lượng nước dùng trong một giờ?", "Thiết kế cần thay đổi gì cho cây lớn hơn?"],
      safety: "Người lớn dùng kim và tạo lỗ. Không treo chai nặng phía trên người; cố định chai chắc chắn."
    },
    {
      id: "g5-heat-colors", grade: 5, category: "science", icon: "🌡️", title: "Màu sắc và khả năng hấp thụ nhiệt",
      time: "35 phút", level: "Vừa", mission: "So sánh sự tăng nhiệt của nước trong cốc bọc giấy đen và giấy trắng dưới cùng nguồn sáng.",
      goals: ["Đo và ghi nhiệt độ", "Tổ chức dữ liệu theo thời gian", "Rút ra kết luận từ bằng chứng"],
      materials: ["2 cốc giống nhau", "Giấy đen và giấy trắng", "Cùng lượng nước", "Nhiệt kế học tập", "Đồng hồ"],
      steps: ["Bọc một cốc bằng giấy đen, cốc kia bằng giấy trắng.", "Cho cùng lượng nước ở cùng nhiệt độ ban đầu vào hai cốc.", "Đặt hai cốc cạnh nhau dưới nắng hoặc đèn bàn, đo nhiệt độ mỗi 5 phút trong 20 phút.", "Lập bảng thời gian - nhiệt độ và so sánh mức tăng của hai cốc."],
      observe: ["Nhiệt độ ban đầu của hai cốc?", "Nhiệt độ sau mỗi 5 phút?", "Cốc nào tăng nhiệt nhanh hơn?"],
      explain: "Bề mặt tối thường hấp thụ nhiều năng lượng bức xạ hơn bề mặt sáng trong cùng điều kiện. Kết quả còn phụ thuộc thời tiết, vị trí và sai số đo.",
      questions: ["Những yếu tố nào phải giữ giống nhau?", "Kiến thức này được ứng dụng vào quần áo hoặc nhà ở thế nào?"],
      safety: "Không dùng nước nóng, không chạm bóng đèn đang nóng và không nhìn thẳng vào Mặt Trời."
    }
  ];
})();
