const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/create-subscription', async (req, res) => {
  try {
    const { paymentMethodId, customerId } = req.body;
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: 'price_29_eur_monthly' }],
      default_payment_method: paymentMethodId,
    });
    res.json({ subscriptionId: subscription.id });
  } catch (error) {
    console.error('Erreur création abonnement:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'customer.subscription.created') {
      console.log('Abonnement créé:', event.data.object.id);
    }
    res.json({ received: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Serveur démarré');
});