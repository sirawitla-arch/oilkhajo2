function handleVipRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    
    alert(`ขอบคุณสำหรับการสมัครสมาชิก VIP คุณ ${name}!\nระบบได้รับข้อมูลและยอดชำระเงิน 1,000 บาท เรียบร้อยแล้ว สิทธิ์ของคุณจะส่งไปที่ ${email}`);
    
    document.getElementById('vipForm').reset();
}