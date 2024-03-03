import { useRef } from "react"
import emailjs from '@emailjs/browser';
const Sendmail = ({avalue}) => {
    const form = useRef()
    const sendemail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_8egm38h', 'template_8mhv6vr', form.current, 'XtZgKKbr9y0TxLQIO')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
        e.target.reset()
    }
    return(
        <div>
            <div className="container">
                <form ref={form} action="" onSubmit={sendemail}>
                    <div>Thông báo</div>
                    <input type="text" name="user_name" required/>
                    <input type="email" name="user_email" required value={avalue}/>
                    <input type="email" name="reply_to" required value={'maiducthang10@gmail.com'}/>
                    <input type="text" name="subject" required/>
                    <textarea name="message" id="" cols="30" rows="10"></textarea>
                    <button type="submit">Gửi mail</button>
                </form>
            </div>
        </div>
    )
}
export default Sendmail