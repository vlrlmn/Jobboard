<template>
    <ModalWindowLayout v-model="isOpen">
        <div class="window-container">
            <FormCard background="white" width="500px" height="600px" v-if="vacancy">
            <template v-slot:header>
                <BaseIconButton icon="tabler:arrow-back-up"
                    @click="closeHandler"
                    fill="clear"/>
                <div class="title">
                    <div class="title__vacancy-name">{{vacancy.name}}</div>
                    <div class="title__vacancy-status" v-if="vacancy.status != 0">
                        {{ getVacancyStatus(vacancy.status) }}
                    </div>
                </div>
            </template>
            <template v-slot:default>
                <div class="modal-content" >
                    <BaseSwitch v-if="isCompanyView && vacancy.status == 0" v-model="currentTab" :items="tabOptions"/>

                    <div class="modal-content__container" v-show="currentTab == 1">

                        <div class="general__main-details" v-if="vacancy.salary">
                            <div class="general-salary">{{vacancy.salary}} AED</div>
                            <div class="general-location">{{ getLocationName(vacancy.locationId) }}</div>
                        </div>

                        <div class="general__secondary-details" v-if="vacancy.experience || vacancy.employmentId || vacancy.withDegree">
                            <div class="genera-experience" v-if="vacancy.experience">
                                from {{vacancy.experience}} years
                            </div>
                            <div class="general-employment" v-if="vacancy.employmentId">
                                <Icon icon="tabler:briefcase" height="1.2em"/>
                                {{getEmploymentName(vacancy.employmentId)}}
                            </div>
                            <div class="general-employment" v-if="vacancy.withDegree">
                                <Icon icon="tabler:school" height="1.2em"/>
                                Degree required
                            </div>
                            <div class="general-employment" v-if="vacancy.workFormatId">
                                {{ getWorkFormat(vacancy.workFormatId)}}
                            </div>
                        </div>
                        
                        <div class="general-skills" v-if="vacancy.skills.length">

                            <Category v-for="skill, index in vacancy.skills"
                                :key="`skill-${index}`"
                                :title="skill" color="var(--primary-color)"/>
                        </div>
                        
                        <div class="general-description">
                            {{ vacancy.comment }}
                        </div>
                    </div>
                    <div class="modal-content__container" v-show="currentTab == 2">
                        <VacancyApplyList :applies="applies"
                        @on-details="onDetailsHandler"/>
                    </div>
                </div>
            </template>
            <template v-slot:footer v-if="!isCompanyView && !isNewApply && !isApplied && isLoaded">
                <BaseButton title="Apply" width="fit-content" primary 
                    v-if="userId && resume"
                    @click="openApplyHandler"/>


                <div v-if="!resume && userId">
                    You can not to apply on this vacancy because you have no resume.
                </div>
                <BaseButton v-if="!resume && userId" title="Create resume" width="fit-content" secondary
                    @click="navTo('user-profile')"/>


                <div v-if="!resume && !userId">
                    You can not to apply on this vacancy because you need to log in first.
                </div>
                <BaseButton v-if="!userId && !resume" title="Log in" width="fit-content" secondary
                    @click="navTo('auth')"/>
            </template>
            <template v-slot:footer v-if="!isCompanyView && isApplied && isLoaded">
                <div class="success-message">
                    <Icon icon="tabler:circle-check" height="1.2em" color="#5cb85c"/>
                    You have already applied on this vacancy
                </div>
            </template>
            <template v-slot:footer v-if="isCompanyView && currentTab == 1 && vacancy.status == 0">
                <BaseButton title="Cancel" 
                    width="fit-content"
                    @click="isCancelAlertOpen = true"/>
            </template>
        </FormCard>
        <FormCard 
        :background="(currentApply && currentTab == 2) || isNewApply ? 
            'white' : 'rgba(215, 215, 215, 0.66)'" 
        width="500px" 
        height="600px">

            <!-- Company view -->

            <template  v-slot:header v-if="currentApply && isCompanyView && currentTab == 2">
                <div class="content-header">
                    <div class="title">
                        <div class="title__vacancy-name">{{currentApply.userName}} </div>
                    </div> 
                    <!-- <h3>{{currentApply.userName}} <span style="font-weight: 300; font-size: 0.9em;">({{currentApply.resumeName}})</span></h3> -->
                </div>
            </template>
            <template v-slot:default v-if="currentApply && isCompanyView  && currentTab == 2">
                <div class="content" v-if="currentResume">
                    <h4>Message</h4>
                    <div class="apply-message" v-if="currentApply.message">
                        {{ currentApply.message }}
                    </div>
                    <h4>{{ currentResume.name }}</h4>
                    <UserResumeView :resume="currentResume"/>
                </div>
            </template>

            <template v-slot:footer v-if="currentApply && isCompanyView  && currentTab == 2">
                <div class="content-footer" v-if="currentApply">
                    <BaseButton title="Hire" primary  />
                    <BaseButton title="Cancel" secondary @click="applyDetails = 0"/>
                </div>
            </template>

            <!-- User view -->

            <template v-slot:header v-if="isNewApply && !isCompanyView">
                <div class="content-header">
                    <h3>Vacancy Apply</h3>
                </div>
            </template>
            <template v-slot:default v-if="isNewApply && !isCompanyView">
                <div class="content" v-if="userId && resume">
                    <h4>Your Resume</h4>
                    <div class="current-resume">
                        <Icon icon="tabler:user" height="1.2em"/>
                        <!-- <div>{{applyForm.resumeName}}</div> -->
                        <div style="flex:1">
                            {{ resume.name }}
                        </div>
                        <div style="font-size: 0.9em;text-decoration: underline;" @click="navTo('user-profile')">
                            Edit
                        </div>
                    </div>
                    <h4>Message</h4>
                    <VacancyApplyForm v-model="applyForm"/>
                </div>
            </template>

            <template v-slot:footer v-if="isNewApply && !isCompanyView">
                <div class="content-footer">
                    <BaseButton title="Submit" primary
                        @click="applyFormSubmit"/>
                    <BaseButton title="Cancel" secondary 
                        @click="applyFormCancel"/>
                </div>
            </template>
        </FormCard>
    </div>
</ModalWindowLayout>
<BaseAlert v-model="isCancelAlertOpen"
    title="Cancel vacancy"
    message="Are you sure you want to cancel this vacancy?"
    confirmText="Yes"
    cancelText="No"
    @on-confirm="cancelVacancyHandler"/>
</template>

<script lang="ts" setup>
import ModalWindowLayout from './ModalWindowLayout.vue';
import FormCard from '../forms/FormCard.vue';
import BaseIconButton from '../inputs/BaseIconButton.vue';
import BaseButton from '../inputs/BaseButton.vue';
import { ref , defineProps, defineModel, computed, watch } from 'vue';
import Vacancy from '../../types/vacancy';
import BaseSwitch from '../inputs/BaseSwitch.vue';
import locations from '../../info/locations';
import Category from '../inputs/Category.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import employments from '../../info/employments';
import VacancyApplyList from '../vacancy-list/VacancyApplyList.vue';
import VacancyApply from '../../types/vacancyApply';
import VacancyApplyFormInstance from '../../types/forms/vacancyApply';
import VacancyApplyForm from '../forms/VacancyApplyForm.vue';
import { useRouter } from 'vue-router';
import CompanyAuth from '../../utils/authCompany';
import workFormats from '../../info/workFormats';
import CompanyAPI from '../../api/company/api';
import BaseAlert from '../inputs/BaseAlert.vue';
import statuses from '../../info/vacancyStatuses';
import UserResume from '../../types/forms/userResume';
import UserAPI from '../../api/user/api';
import UserAuth from '../../utils/authUser';
import UserResumeView from '../vacancy-list/UserResumeView.vue';

const isOpen = defineModel<boolean>({required:true})

const closeHandler = () => {
    applyDetails.value = 0
    isApplied.value = false
    isOpen.value = false
}


const router = useRouter()
const navTo = (name:string) => {
    router.push({name})
} 

const props = defineProps({
    vacancy: Vacancy,
    isCompanyView: Boolean,
})
const emits = defineEmits([
    'on-cancel-vacancy',
])

const isLoaded = ref<boolean>(false)

watch(() => props.vacancy, async () => {
    if (!props.vacancy) {
        applies.value = []
        return
    }
    const userId = UserAuth.getUserId()
    isLoaded.value = false
    if (!resume.value && userId) {
        try {
            await UserAPI.info.getResume(userId).then(response => {
            if (response.status >= 400) {
                return
            }
            const data = response.data
            if (!data) {
                return
            }
            resume.value = new UserResume(data)
        })
        } catch (error) {
            console.log(error)
        }
    }
    await props.vacancy.setupDetails()

    await UserAPI.apply.applyList(props.vacancy.id).then(response => {
        if (response.status >= 400) {
            applies.value = []
            return
        }
        const data = response.data
        if (!data) {
            applies.value = []
            return
        }
        applies.value = data.map((apply:any) => new VacancyApply(apply))
        isApplied.value = !!applies.value.find(apply => apply.userId == userId)
    })
    
    setTimeout(() => {
        isLoaded.value = true
    }, 100)
})


// APPLY

const applyDetails = ref<number>(0)
const onDetailsHandler = (userId:number) => {
    applyDetails.value = userId
}
const applies = ref<VacancyApply[]>([])

const currentApply = computed<VacancyApply | undefined>(() => {
    return applies.value.find(apply => apply.userId == applyDetails.value)
})
const currentResume = ref<UserResume | undefined>()
watch(() => currentApply.value, () => {
    currentResume.value = undefined
    if (!currentApply.value) {
        return
    }
    UserAPI.info.getResume(currentApply.value.userId).then(response => {
        if (response.status >= 400) {
            console.error(response)
            return
        }
        const data = response.data
        if (!data) {
            return
        }
        currentResume.value = new UserResume(data)
    })
})


const getLocationName = (id:number) => {
    return locations.find(loc => loc.value == id)?.title
}

const userId = UserAuth.getUserId()
const isNewApply = ref<boolean>()
const resume = ref<UserResume|undefined>()
const applyForm = ref<VacancyApplyFormInstance>(new VacancyApplyFormInstance())
const isApplied = ref<boolean>(false)
const closeApplyHandler = () => {
    applyForm.value.clear()    
    isNewApply.value = false
}
const applyFormSubmit = () => {
    if (!props.vacancy || !userId || !resume.value) {
        return
    }
    UserAPI.apply.applyVacancy(props.vacancy.id, {
        user_id: userId,
        message: applyForm.value.message,
        company_id: props.vacancy.companyId,
        resume_id: resume.value.id,
    }).then(() => {
        isApplied.value = true
        closeApplyHandler()
    })
}
const applyFormCancel = () => {
    closeApplyHandler()
}

const openApplyHandler = () => {
    const userId = UserAuth.getUserId()
    if (!userId) {
        return
    }
    isNewApply.value = true

}

// TABS
const tabOptions = computed(() => {
    return [
        {title: 'General', value: 1},
        {title: `Applies ${applies.value.length}`, value: 2},
    ]
})
const currentTab = ref(1)

const getEmploymentName = (id:number) => {
    return employments.find(emp => emp.value == id)?.title
}

const getWorkFormat = (id:number) => {
    return workFormats.find(wf => wf.value == id)?.title
}

// Cancel

const isCancelAlertOpen = ref<boolean>(false)
const cancelVacancyHandler = () => {
    const companyId = CompanyAuth.getCompanyId()
    if (!companyId || !props.vacancy) {
        return
    }
    CompanyAPI.vacancy.cancel(companyId, props.vacancy.id)
    .then(() => {
        if (!props.vacancy) {
            return
        }
        props.vacancy.status = 2
        emits('on-cancel-vacancy', props.vacancy)
    })
}

const getVacancyStatus = (status:number) => {
    return statuses.find(st => st.value == status)?.title
}

</script>

<style scoped>
.window-container{
    display: flex;
    flex-direction: row;
    gap: 16px;
}

.modal-content__container{
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    overflow: hidden;
}

.general__main-details{
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
}

.general__secondary-details {
    display: flex;
    flex-direction: row;
    gap: 16px;
    color: #616161;
}

.general-salary{
    font-size: 1.5em;
}

.general-skills{
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
}

.general-description{
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 10px;
    border-radius: 8px;
    background: var(--input-background);
    max-height: 300px;
    overflow-y: auto;
}

.general-employment{
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
}

.modal-content{
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.model-content.disabled{
    filter:grayscale(0.6);
    pointer-events: none;
}

.content-header{
    height: 36px;
    width: 100%;
    display: flex;
    align-items: center;
}

.content-footer{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
}
.content{
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.current-resume{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    
    padding: 11px;
    width: 100%;
    border-radius: 8px;
    background: var(--input-background);
    border: 1px solid var(--border-color);

    cursor: default;
    transition: background .3s;
    box-sizing: border-box;
}

@media (min-width: 868px){
    .current-resume:hover{
        background: var(--input-background-hover);
    }
}

.title{
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: flex-end;
}

.title__vacancy-name{
    font-weight: 500;
    font-size: 1.2em;
}

.title__vacancy-status{
    font-size: 0.95em;
    color: #616161;
}

.success-message{
    background: #def0de;
    /* border: 1px solid #5cb85c; */
    border-radius: var(--border-radius);
    padding: 7px 11px;

    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
}

.apply-message{
    padding: 7px 11px;
    border-radius: var(--border-radius);
    border: 1px solid var(--primary-color);
}
</style>