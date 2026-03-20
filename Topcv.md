Nhìn đoạn code mẫu này thì tôi thấy gần như xác nhận đúng điều tôi nói lúc nãy:

TopCV không làm kiểu một file CV tĩnh rồi sửa đè lên.
Họ đang làm theo kiểu template renderer + editable block + data binding theo field.

Tôi nhìn ra mấy thứ rất rõ
1. Họ bind từng ô vào data thật

Ví dụ trong snippet có mấy chỗ như:

data-path="profile.fullname"

data-path="profile.title"

data-path="profile.phone"

Điều này rất quan trọng. Nó cho thấy mỗi vùng text trên CV đang map thẳng vào một field dữ liệu cụ thể, ví dụ:

tên

vị trí ứng tuyển

số điện thoại

Nghĩa là họ không sửa “cả cái CV”, mà sửa field nào thì ghi lại đúng field đó.

2. Họ đang dùng rich text editor nhúng vào từng block

Trong code có:

ql-editor

ql-toolbar

ql-container ql-snow

Đây là dấu hiệu rất rõ của Quill editor hoặc một bản custom dựa trên Quill.
Tức là mỗi block text là một editor riêng, có:

font size

font family

color

bold / italic / underline

Nên mới có cảm giác bôi đen rồi sửa trực tiếp rất mượt như ảnh bạn gửi.

3. Họ đang đi theo block-based renderer

Trong snippet có các kiểu:

element-type-image

element-type-text-single

element-type-icon

block-main profile.avatar

block-main profile.business_card

Tức là template CV của họ được chia thành các block / element có type rõ ràng:

image

text

icon

group

section

Đây là đúng kiểu của một render engine có schema, không phải HTML viết tay nguyên cục.

4. Có drag/drop và action layer riêng

Có các dấu hiệu như:

data-draggable="true"

btn-drag-action

btn-action-delete

btn-action-add

fa-arrow-up, fa-arrow-down

Điều này cho thấy họ có một lớp quản lý block riêng:

kéo block

đổi vị trí

thêm block

xóa block

đẩy lên / xuống

Nghĩa là editor của họ không chỉ là text editor, mà là document builder thật.

5. Layout của họ là DOM/CSS, không phải canvas

Tôi thấy:

grid-template-columns: 3fr 9fr

nhiều flex-row, flex-column

layout-render

render-item

Tức là CV đang được dựng bằng DOM + CSS grid/flex, sau đó gắn editor vào từng chỗ.
Đây là lý do TopCV-style editor dễ làm hơn Canva-style canvas editor cho bài toán CV.

6. Có vẻ họ dùng Vue

Các attribute như:

data-v-71fc11ab

data-v-11f48087

rất giống Vue SFC scoped styles.
Ngoài ra còn có el-popper, el-popover trông giống hệ của Element Plus / Element UI. Tôi không dám khẳng định 100% toàn bộ stack chỉ từ snippet này, nhưng khả năng cao phần builder đang đi theo hệ Vue.

Kết luận kỹ thuật

Từ snippet này, kiến trúc của họ nhiều khả năng là:

Data layer
profile.fullname
profile.title
profile.phone
profile.dob
...
Template layer

Template định nghĩa:

block nào nằm ở đâu

block nào là image/text/icon

block nào draggable

block nào có action riêng

Editor layer

Mỗi text block dùng Quill để edit inline.

UI control layer

Toolbar/popup/action hiện theo block đang focus.

Render layer

Dùng DOM/CSS grid/flex để hiển thị CV.

Nói thẳng: đây là lý do code của bạn chưa giống họ

Nếu code bạn hiện giờ chỉ là:

render template HTML

rồi cho sửa form ở panel bên cạnh

hoặc một editor chung cho cả trang

thì sẽ không có cảm giác như TopCV.

Để giống họ, bạn cần:

1. Mỗi field là một block riêng

Ví dụ:

EditableText path="profile.fullname"

EditableText path="profile.title"

EditableText path="profile.phone"

2. Có path binding

Đây là điểm rất quan trọng.
Không có path thì bạn không biết block đó đang sửa cái gì.

3. Có block registry

Ví dụ:

text-single

image

icon

group

section

4. Có renderer đọc schema

Ví dụ template không viết chết, mà render từ config.

Tôi đánh giá đoạn code này là khá khôn

Nó không phải kiểu code “quá đẹp” hay “siêu hiện đại” chỉ nhìn qua snippet, nhưng về ý tưởng kiến trúc thì rất đúng cho CV builder:

không dùng canvas làm lõi

dùng block có type rõ ràng

dùng field path để bind dữ liệu

dùng rich text editor cho từng vùng

dùng DOM layout để giữ CV giống tài liệu thật

Đó là hướng bạn nên học theo.

Cái bạn nên copy từ họ

Bạn nên học 4 ý này:

1. data-path cho từng field
Đây là lõi.

2. block-based renderer
Template không viết một cục, mà chia element type.

3. inline editor riêng cho từng block
Không phải một editor chung cho cả document.

4. action layer tách riêng
Drag, add, delete, move block không nên trộn với text logic.

Cái bạn không nhất thiết phải copy y chang

không cần dùng Quill nếu bạn thích Tiptap hoặc Lexical

không cần dùng Vue nếu web bạn là React

không cần clone hết popup/action giống họ ngay từ đầu

Cái cần copy là tư duy kiến trúc, không phải thư viện y chang.

Chốt một câu

Đoạn code này cho thấy TopCV đang làm theo kiểu schema-driven CV editor: mỗi vùng trong CV là một block có type, có data-path, có editor riêng và được render trên DOM/CSS. Đây chính là lý do họ chỉnh trực tiếp trên mẫu được rất mượt, còn nếu bạn chỉ render template tĩnh thì sẽ không làm ra cảm giác đó.

Tôi có thể viết tiếp cho bạn một bản kiến trúc clone kiểu TopCV bằng React với:

template schema

data-path binding

EditableTextBlock

TemplateRenderer

toolbar theo selected block