<template>

    <div class="pt-2 m-2">
        <!-- 发布评论 -->
        <div v-if="useUserStore().getToken">

            <el-input v-model="commitValue" :rows="2" type="textarea"></el-input>
            <div class="w-full text-right">
                <el-button type="primary" size="small" :disabled="!commitValue" @click="toComment(0)">
                    留言</el-button>
            </div>
        </div>
        <div v-else>
            <span class="text-blue-500" @click="toLogin">登录</span>可进行评论
        </div>

        <!-- 历史评论 -->
        <div>
            <div class="flex justify-between">
                <span> 历史评论 <el-badge type="primary" :value="commentsList?.length" /> </span> <span><span
                        class="mr-2 cursor-pointer" @click="commitSort()">按时间{{ sortType === 0 ? '顺序' : '倒序' }} </span>
                </span>
            </div>

            <div class="px-3">
                <div v-for="item in commentsList" :key="item.id">

                    <div>
                        <p class="flex items-center mx-2">
                            <el-avatar class="flex-none" :src="item.user.avatar" />

                        <div class="flex flex-col w-full mx-2">
                            <div class="font-sans ">
                                {{ item.user.username }}<span v-if="item.user.id === author.id"
                                    class="p-[2px] text-[12px] text-yellow-600 border-yellow-600 rounded-md y-1 border-1">
                                    作者 </span>
                            </div>
                            <div class="w-full text-xs">
                                {{}} {{ dateToStr1(item.createdAt) }}
                            </div>
                        </div>


                        </p>
                        <div class="items-center w-full pl-13 ">
                            <div class="mt-2 ">
                                {{ item.content }}
                            </div>
                            <div class="w-full my-2 text-gray-400">
                                <Icon @click="commentItem(item)" class="cursor-pointer" size="20" color="text-gray-400"
                                    name="mdi:message-processing" />
                                <span>回复</span>
                            </div>
                        </div>
                    </div>

                    <div class="pl-13" v-if="item.isCommit">
                        <el-input v-model="item.comment" :rows="2" type="textarea"></el-input>
                        <div class="w-full m-1 text-right">
                            <el-button @click="item.isCommit = false" size="small">取消</el-button>
                            <el-button @click="toComment(1, item)" type="primary" size="small"
                                :disabled="!item.comment">发布</el-button>
                        </div>
                    </div>

                    <ul class="p-2 ml-12 bg-light-600 dark:bg-gray-700">
                        <li v-for="cItem in item.children" :key="cItem.id">
                            <div v-if="cItem.toUser?.username" class="flex flex-col items-center">
                                <div class="flex items-center w-full">
                                    <el-avatar class="flex-none" :size="36" :src="cItem.user.avatar" />
                                    <div class="flex flex-col w-full mx-2">
                                        <div class="font-sans ">{{ cItem.user.username }}<span
                                                v-if="cItem.user.id === author.id"
                                                class="p-[2px] text-[12px] text-yellow-600 border-yellow-600 rounded-md y-1 border-1">
                                                作者 </span></div>
                                        <div class="text-xs">
                                            {{}} {{ dateToStr1(cItem.createdAt) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full mt-2">
                                    <div class="w-full">
                                        <a class="font-sans text-blue-500">
                                            <span>@</span>
                                            {{ cItem.toUser?.username }}:
                                        </a>
                                        <span> {{ cItem.content }}</span>


                                    </div>
                                    <div class="w-full my-2 text-gray-400">
                                        <Icon @click="commentItem(cItem)" class="cursor-pointer" size="20"
                                            color="text-gray-400" name="mdi:message-processing" />
                                        <span>回复</span>
                                    </div>
                                    <div class="" v-if="cItem.isCommit">
                                        <el-input v-model="cItem.comment" :rows="2" type="textarea"></el-input>
                                        <div class="w-full m-1 text-right">
                                            <el-button @click="cItem.isCommit = false" size="small">取消</el-button>
                                            <el-button
                                                @click="toComment(2, { id: item.id, content: cItem.comment, user: cItem.user })"
                                                type="primary" size="small" :disabled="!cItem.comment">发布</el-button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div v-else class="flex flex-col items-center">
                                <div class="flex items-center w-full">
                                    <el-avatar class="flex-none" :size="36" :src="cItem.user.avatar" />
                                    <div class="flex flex-col w-full mx-2">
                                        <div class="font-sans ">{{ cItem.user.username }} <span
                                                v-if="cItem.user.id === author.id"
                                                class="p-[2px] text-[12px] text-yellow-600 border-yellow-600 rounded-md y-1 border-1">
                                                作者 </span>
                                        </div>
                                        <div class="text-xs">
                                            {{ }} {{ dateToStr1(cItem.createdAt) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full mt-2">
                                    <div>
                                        {{ cItem.content }}
                                    </div>
                                    <div class="w-full my-2 text-gray-400">
                                        <Icon @click="commentItem(cItem)" class="cursor-pointer" size="20"
                                            color="text-gray-400" name="mdi:message-processing" />
                                        <span>回复</span>
                                    </div>
                                    <div class="" v-if="cItem.isCommit">
                                        <el-input v-model="cItem.comment" :rows="2" type="textarea"></el-input>
                                        <div class="w-full m-1 text-right">
                                            <el-button @click="cItem.isCommit = false" size="small">取消</el-button>
                                            <el-button
                                                @click="toComment(2, { id: item.id, content: cItem.comment, user: cItem.user })"
                                                type="primary" size="small" :disabled="!cItem.comment">发布</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import { useUserStore } from "@/store/modules/user";
import { ElMessage, ElBadge } from "element-plus";

interface authorDto {
    author: { id: string }
}

defineProps<authorDto>()

const userInfo: any = useUserStore();

const { dateToStr1 } = useUtils();

const route = useRoute()

const commentsList = ref();

const commitValue = ref();

// 获取文章评论
async function comments() {
    console.log(route)
    const { data } = await articleComments({ id: route?.params?.id });
    commentsList.value = data;
}

onMounted(() => {
    comments()
})

// 评论已有的信息
function commentItem(item: { isCommit: boolean; }) {
    if (!userInfo.getToken) {
        ElMessage.warning("请先登陆")
        toLogin()
        return
    }
    item.isCommit = true
}


// 登陆
function toLogin() {
    useDialog(h(LoginForm), "登陆", {
        dangerouslyUseHTMLString: true,
        lockScroll: false,
        draggable: true,
    });
}

// 发评论
async function toComment(type: number, item: any = {}) {
    let data: any = {
        article: route.params.id,
        parentId: "0",
        content: commitValue.value,
        user: userInfo.users.id,
    };
    // 回复一级评论
    if (type === 1) {
        data = {
            article: route.params.id,
            parentId: item.id,
            content: item.comment,
            user: userInfo.users.id,
            // toUser: item.user.id
        }
    }
    // 回复二级评论
    if (type === 2) {
        data = {
            article: route.params.id,
            parentId: item.id,
            content: item.content,
            user: userInfo.users.id,
            toUser: item.user.id
        }
    }
    const res: any = await comment(data);
    ElMessage.success(res.msg)
    comments()
}

// 0 倒序1 顺序
const sortType = ref(0)
function commitSort() {
    sortType.value === 0 ? sortType.value = 1 : sortType.value = 0
    commentsList.value.reverse()
}
</script>