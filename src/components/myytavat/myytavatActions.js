export const MYYTAVAT_REQUEST = "MYYTAVAT_REQUEST"
export const MYYTAVAT_SUCCESS = "MYYTAVAT_SUCCESS"
export const MYYTAVAT_FAILURE = "MYYTAVAT_FAILURE"

export const getMyytavat = () => ({
  type: MYYTAVAT_REQUEST
})

export const myytavatSuccess = myytavat => ({
  type: MYYTAVAT_SUCCESS,
  myytavat
})

export const myytavatError = error => ({
  type: MYYTAVAT_FAILURE,
  error
})
