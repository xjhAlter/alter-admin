<template>
    <div class="login-wrapper">
        <div class="login-form">
            <el-form
                :model="loginForm"
                :rules="loginRules"
                ref="refLogin"
                status-icon
                label-width="80px"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit()">登录</el-button>
                    <el-button @click="reset()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, toRefs, ref } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'

    export default defineComponent({
        name: 'login',
        setup() {
            const router = useRouter()
            const store = useStore()

            const refLogin = ref(null)

            const stateProp = {
                loginForm: {
                    username: '',
                    password: '',
                },
                loginRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 8, messgage: '长度在 2 到 8 个字符', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 - 16 个字符', trigger: 'blur' },
                    ],
                },
            }
            const state = reactive(stateProp)

            const submit = () => {
                ;(refLogin.value as any).validate((valid: boolean) => {
                    if (valid) {
                        const loginData = {
                            username: state.loginForm.username,
                            password: state.loginForm.password,
                        }
                        store.dispatch('user/login', loginData).then(() => {
                            next()
                        })
                    }
                })
            }

            const reset = () => {
                // state.loginForm.username = "";
                // state.loginForm.password = "";
                ;(refLogin.value as any).resetFields()
            }

            const next = () => {
                router.push('/')
            }

            return {
                ...toRefs(state),
                refLogin,
                submit,
                reset,
            }
        },
    })
</script>

<style lang="scss" scoped>
    .login-wrapper {
        @include wh(100%, 100%);
        @include flexcenter;
        .login-form {
            @include wh(500px, 400px);
            border: 1px solid #d8d8d8;
            border-radius: 4px;
            padding: 60px 20px;
        }
    }
</style>
