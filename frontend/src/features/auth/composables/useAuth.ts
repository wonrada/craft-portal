import { reactive, ref, watch } from 'vue'
import { authService } from '../services/authService'
import type { FieldErrors, LoginCredentials } from '../types/authTypes'

// ── Validation (returns i18n key strings translated by the caller) ──────────
function validateCredentials(form: LoginCredentials): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.email) {
    errors.email = 'auth.validation.emailRequired'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'auth.validation.emailInvalid'
  }

  if (!form.password) {
    errors.password = 'auth.validation.passwordRequired'
  } else if (form.password.length < 8) {
    errors.password = 'auth.validation.passwordMin'
  }

  return errors
}

// ── Composable ───────────────────────────────────────────────────────────────
export function useAuth() {
  const form = reactive<LoginCredentials>({
    email:    '',
    password: '',
  })

  const fieldErrors = reactive<FieldErrors>({})
  const serverError = ref<string | null>(null)
  const loading     = ref(false)
  const submitted   = ref(false) // tracks whether the form was submitted once (for live validation)

  watch(form, () => {
    if (!submitted.value) return
    const errors = validateCredentials(form)
    fieldErrors.email    = errors.email
    fieldErrors.password = errors.password
  })

  function clearErrors() {
    delete fieldErrors.email
    delete fieldErrors.password
    serverError.value = null
  }

  /** Returns true on success, false on failure. Persists token to localStorage. */
  async function login(): Promise<boolean> {
    submitted.value = true
    clearErrors()

    const errors = validateCredentials(form)
    if (Object.keys(errors).length) {
      Object.assign(fieldErrors, errors)
      return false
    }

    loading.value = true
    try {
      const result = await authService.login(form)
      localStorage.setItem('cp-token', result.token)
      return true
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number; data?: { message?: string; errors?: Record<string, string[]> } } }

      if (axiosErr.response?.data?.errors) {
        // 422 — map first error of each field
        const apiErrors = axiosErr.response.data.errors
        for (const key of Object.keys(apiErrors) as Array<keyof FieldErrors>) {
          fieldErrors[key] = apiErrors[key]?.[0]
        }
      } else {
        serverError.value = axiosErr.response?.data?.message ?? 'auth.login.errorGeneric'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    fieldErrors,
    serverError,
    loading,
    submitted,
    login,
  }
}
