import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId é obrigatório' },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('trial_start_date, trial_end_date, subscription_status')
      .eq('id', userId)
      .single();

    if (error) throw error;

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const now = new Date();
    const trialEndDate = user.trial_end_date ? new Date(user.trial_end_date) : null;
    
    const isTrialActive = trialEndDate ? now < trialEndDate : false;
    const isTrialExpired = trialEndDate ? now >= trialEndDate : false;
    const hasSubscription = user.subscription_status === 'active';

    const daysRemaining = trialEndDate 
      ? Math.max(0, Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        isTrialActive,
        isTrialExpired,
        hasSubscription,
        daysRemaining,
        trialEndDate: user.trial_end_date,
        subscriptionStatus: user.subscription_status,
        needsCheckout: isTrialExpired && !hasSubscription
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
