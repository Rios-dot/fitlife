import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, paymentMethod, amount } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId é obrigatório' },
        { status: 400 }
      );
    }

    // Atualizar status da assinatura
    const { data: user, error: updateError } = await supabase
      .from('users')
      .update({
        subscription_status: 'active',
        subscription_start_date: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Registrar pagamento
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([{
        user_id: userId,
        amount: amount || 99.90,
        payment_method: paymentMethod || 'credit_card',
        status: 'completed',
        payment_date: new Date().toISOString(),
      }])
      .select()
      .single();

    if (paymentError) throw paymentError;

    return NextResponse.json({
      success: true,
      data: {
        user,
        payment,
        message: 'Assinatura ativada com sucesso!'
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
