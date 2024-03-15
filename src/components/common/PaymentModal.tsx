import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import { useTranslations } from "next-intl";
import { addNewDonation } from "@/actions/donations";

interface PaymentModalProps {
  campaign: CampaignType;
  amount: number;
  messageText: string;
}

function PaymentModal({ campaign, amount, messageText }: PaymentModalProps) {
  const [loading, setLoading] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "https://localhost:3000/profile/donations",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Платіж успішно здійснено");
        const donationPayload = {
          campaign: campaign._id,
          amount,
          message: messageText,
          paymentId: result.paymentIntent?.id,
        };
        console.log(donationPayload);
        await addNewDonation(donationPayload);
        message.success("Донат успішний");
        // router.push("/profile/donations");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const t = useTranslations("Campaign");

  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />

      {/* <AddressElement
        options={{
          allowedCountries: ["UA"],
          mode: "shipping",
        }}
      /> */}
      <div className="flex gap-5 justify-end mt-5">
        <Button>{t("cancel")}</Button>
        <Button type="default" htmlType="submit" loading={loading}>
          {t("pay")}
        </Button>
      </div>
    </form>
  );
}

export default PaymentModal;
