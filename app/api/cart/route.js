import connectToDB from '@/lib/mongoose';
import Cart from '../../models/Cart';
// Explanation:
// 1st ../ → exits /cart
// 2nd ../ → exits /api
// Then enters /models

export async function GET(request) {
  try {
    await connectToDB();
    const userId = request.headers.get('userId');
    if (!userId) return Response.json({ items: [] });

    const cart = await Cart.findOne({ userId });
    return Response.json({ items: cart?.items || [] });
  } catch (error) {
    return Response.json({ items: [] });
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const { userId } = request.headers.get('userId');
    const { items } = await request.json();

    await Cart.findOneAndUpdate(
      { userId },
      { userId, items },
      { upsert: true, new: true }
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}